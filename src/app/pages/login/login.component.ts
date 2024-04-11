import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null;

  email = '';
  password = '';

  userService = inject(UserService);
  routerService = inject(Router);

  constructor() {}

  ngOnInit(): void {
    console.log('ngOnInit LoginComponent');
  }

  handleSubmit() {
    this.errorMessage = null;

    if (!this.email || !this.password) {
      this.errorMessage = 'Email and Password are required!';
      return;
    }

    this.onLogin();
  }

  async onLogin() {
    const success = await this.userService.login(this.email, this.password);

    if (success) {
      // Set email to local storage
      window.localStorage.setItem('email', this.email);
      this.routerService.navigateByUrl('wochenplan');
    } else {
      this.errorMessage = 'Wrong Email or Password!';
    }
  }
}
