import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {

  userService: UserService = inject(UserService);
  savedUser: any

 async ngOnInit(){
    const email = localStorage.getItem('email');
    if(email) { 
     this.savedUser = await this.userService.getUser(email);
    } else{
      
    }
  }

}
