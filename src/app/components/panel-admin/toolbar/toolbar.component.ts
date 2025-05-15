import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@services/layout.service';
import { AppConfigurator } from '@components/layout/app.configurator';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  items!: MenuItem[];

   constructor(public layoutService: LayoutService) {}

   toggleDarkMode() {
      this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
   }

}
