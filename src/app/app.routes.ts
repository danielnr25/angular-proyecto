import { Routes } from '@angular/router';
import { Error404Component } from '@pages/error404/error404.component';
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
   //loadChildren: () => import('./pages/private/private.routes').then(a=>a.privateRoute)
   loadChildren: () => import('./admin/admin.routes').then(a=>a.routes)

  },
  {
    path:'notfound',
    component:Error404Component
  },
  {
    path:"**", // cualquier ruta no definida
    redirectTo:'/notfound',
  },

];
