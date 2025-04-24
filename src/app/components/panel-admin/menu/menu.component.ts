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
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  model: MenuItem[] = [];

  ngOnInit() {
      this.model = [
          {
              label: 'Home',
              items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
          },
          {
              label: 'UI Components',
              items: [
                  { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                  { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                  { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                  { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                  { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                  { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                  { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                  { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                  { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                  { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                  { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                  { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                  { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                  { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                  { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
              ]
          },
      ];
  }
}
