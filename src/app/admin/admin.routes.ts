import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { authGuard } from "@guards/auth.guard";
import { TipoProyectoComponent } from "./tipo-proyecto/tipo-proyecto.component";

export const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
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
