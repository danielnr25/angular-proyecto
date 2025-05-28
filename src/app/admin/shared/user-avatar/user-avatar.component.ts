import { Component, Input,NgModule } from '@angular/core';

@Component({
  selector: 'user-avatar',
  standalone:true,
  imports: [],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {
   @Input() dataLetters?: string | null;
}
