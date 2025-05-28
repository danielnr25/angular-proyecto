import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { LayoutService } from '@services/layout.service';
import { AppConfigurator } from '@components/layout/app.configurator';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TooltipModule,StyleClassModule, AppConfigurator],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  items!: MenuItem[];
  router = inject(Router);
   constructor(public layoutService: LayoutService) {}

   toggleDarkMode() {
      this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
   }

   OnchangeQuit(){
     localStorage.clear();
     this.router.navigate(['login']);
   }


}
