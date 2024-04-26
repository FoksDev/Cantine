import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
  type OnInit,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @Output() onCloseEvent = new EventEmitter();
  @Output() onSuccesEvent = new EventEmitter();
  errorMessage: string | null = null;

  email = 'test1';
  password = 'test@1';
  islogin = true;

  userService = inject(UserService);
  routerService = inject(Router);

  constructor() {}

  ngOnInit(): void {
    console.log('ngOnInit LoginComponent');
  }

  handleSubmit() {
    console.log('hallo',this.email,this.password);
    this.errorMessage = null;

    if (!this.email || !this.password) {
      this.errorMessage = 'Email and Password are required!';
      return;
    }

    if (this.islogin) {
      this.onLogin();
    }
    else {
      console.log('SignUp');
    }
  }

  async onLogin() {
    const success = await this.userService.login(this.email, this.password);

    if (success) {
      window.localStorage.setItem('email', this.email);
      this.routerService.navigate(['/']);
      this.onClose();
      this.onSucces();
    } else {
      this.errorMessage = 'Wrong Email or Password!';
    }
  }
  test(name:string){
    console.log(name)
  }
  toggleLogin(){
    this.islogin = !this.islogin
  }

  onClose() {
    this.onCloseEvent.emit();
  }

  onSucces() {
    this.onSuccesEvent.emit();
  }
}
