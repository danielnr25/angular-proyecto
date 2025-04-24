import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
import { PrivateComponent } from '@pages/private/private.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PrivateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-proyecto';
}
