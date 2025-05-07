import { Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
import { PrivateComponent } from '@pages/private/private.component';
export const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'login', // está es la ruta principal
    component:PrivateComponent
  },
  {
    path:"**", // cualquier ruta no definida
    redirectTo:'/login'
  }

];
