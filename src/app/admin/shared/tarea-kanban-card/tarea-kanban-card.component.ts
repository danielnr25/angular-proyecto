import {
   Component, EventEmitter, Input, NgModule, Output,
 } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
@Component({
  selector: 'task-kanban-card',
  imports: [],
  standalone: true,
  templateUrl: './tarea-kanban-card.component.html',
  styleUrl: './tarea-kanban-card.component.scss'
})
export class TareaKanbanCardComponent {
   @Input() task?: any;
   @Output() eventEditar: EventEmitter<any> = new EventEmitter();
   @Output() eventEliminar: EventEmitter<any> = new EventEmitter();
   
   constructor(private router: Router) {
   }

   getAvatarText = (nombre: string) => nombre.split(' ').map((nombre) => nombre[0]).join('');

   eliminar = (e:any) => {
      e.event.stopPropagation();
      this.eventEliminar?.emit(this.task);
   };


}
