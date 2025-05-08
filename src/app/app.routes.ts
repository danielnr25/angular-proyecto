import { Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
export const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'login', // está es la ruta principal
    component:LoginComponent
  },
  {
    path:'admin',
    //component:PrivateComponent,
   loadChildren: () => import('./pages/private/private.routes').then(a=>a.privateRoute)
  },
  {
    path:"**", // cualquier ruta no definida
    redirectTo:'/login'
  },

];
