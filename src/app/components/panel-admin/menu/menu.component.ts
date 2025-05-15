import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuitemComponent } from '../menuitem/menuitem.component';
@Component({
  selector: 'app-menu',
  standalone:true,
  imports: [RouterModule,MenuitemComponent,CommonModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  model: MenuItem[] = [];

  ngOnInit() {
      this.model = [
          {
              label: 'Home',
              items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
          },
          {
              label: 'Proyectos',
              items: [
                  { label: 'Tipos de Proyecto', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/tipo_proyecto'] },
                  { label: 'Proyecto', icon: 'pi pi-fw pi-circle', routerLink: ['/admin/proyecto'] }
              ]
          },
      ];
  }
}
