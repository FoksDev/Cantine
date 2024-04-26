import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone : true,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  imports: [CommonModule,RouterOutlet,FormsModule]
})

export class ContactFormComponent {

  name: any;
  email: any;
  betreff: any;
  message: any;

  sendMail() {
    const subject = encodeURIComponent(this.betreff);
    const body = encodeURIComponent(this.message);
    window.location.href = `mailto:${this.name}<${this.email}>?subject=${subject}&body=${body}`;
  }
}
  //in der sendmail funktion nehme ich die werte für den name,email,betreff,message
//mailto:name <email>?body=<message>?subject=<betreff>"
// verbinden von variablen von imputfeld siehe login compponent [(ngModel)]  