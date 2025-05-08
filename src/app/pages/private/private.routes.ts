import { Routes } from "@angular/router";
import { PrivateComponent } from "./private.component";
import { authGuard } from "@guards/auth.guard";
import { TipoProyectoComponent } from "@admin/tipo-proyecto/tipo-proyecto.component";

export const privateRoute: Routes = [
  {
    path:'',
    component:PrivateComponent,
    canActivate:[authGuard],
    children:[
      {
        path: "tipos-de-proyecto",
        component:TipoProyectoComponent
      }
    ]
  }


  /*
    ruta principal: admin
    ruta secundaria: admin/tipos_proyectos
                    admin/usuarios



  */

]
