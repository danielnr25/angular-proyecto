import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '@components/layout/app.floatingconfigurator';
const PRIMENG_MODULES = [ButtonModule];

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [PRIMENG_MODULES, RouterModule, AppFloatingConfigurator],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css',
})
export class Error404Component {}
