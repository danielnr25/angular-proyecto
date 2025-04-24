import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
const PRIMENG_MODULES = [CheckboxModule,FormsModule,ButtonModule,InputTextModule,PasswordModule,RippleModule];
@Component({
  selector: 'app-login',
  imports: [PRIMENG_MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  checked: boolean = false;
}
