import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Proyecto } from '@interfaces/proyecto';
import { ProyectoService } from '@services/proyecto.service';
import { ModalComponent } from './modal/modal.component';
const PRIMENG_MODULES = [
  TableModule,
  InputIconModule,
  IconFieldModule,
  MultiSelectModule,
  InputTextModule,
  SelectModule,
  SliderModule,
  ProgressBarModule,
  TagModule,
  ButtonModule,
  ConfirmDialogModule,
  ToastModule,
];

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [PRIMENG_MODULES, CommonModule, FormsModule,ModalComponent],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css',
})
export class ProyectoComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  proyectos: Proyecto[] = [];
  loadingProyecto: boolean = true;

  private _svProyecto = inject(ProyectoService);

  showModal = false; // booleano para poder iniciarlo el valor del modal
  editMode: 'create' | 'edit' = 'create';
  selectedProyecto: Proyecto | null = null;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.loadingProyecto = false;
    this.cargarLista();
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getSeverity(status: string) {
    switch (status) {
      case 'ACTIVO':
        return 'success';
      case 'INACTIVO':
        return 'danger';
      default:
        return 'info';
    }
  }

  openModalCreate() {
    this.editMode = 'create';
    this.showModal = true;
    this.selectedProyecto = {
      idproyecto: 0,
      nombre: '',
      idtipo_proyecto: 0,
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      detalle: '',
      estado: 'ACTIVO',
      idusuario: 0,
    };
  }

  openModalEdit(proyecto: Proyecto): void {
    this.editMode = 'edit';
    this.showModal = true;
    this.selectedProyecto = { ...proyecto };
  }

  eliminarTipoProyecto(id: number): void {
  this._svProyecto.eliminarProyecto(id).subscribe({
        next: (response) => {
          this.cargarLista();
          this.messageService.add({
              severity: 'success',
              summary: 'Eliminando',
              detail: response.message,
              life: 3000
          })
        },
        error: (err) => {
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.message,
              life: 3000
          })
        }
    });
   }

  confirmarEliminacion(proyecto: Proyecto) {

    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar el proyecto "${proyecto.nombre}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarTipoProyecto(proyecto.idproyecto);
      },
    });
  }

  cargarLista(): void {
    this.loadingProyecto = true;
    this._svProyecto.getListProyecto().subscribe({
      next: (data) => {
        this.proyectos = data;
      },
      error: (data) => {
        console.error('Error data', data);
      },
      complete: () => {
        this.loadingProyecto = false;
      },
    });
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  formatDateTime(input: string | Date): string {
    const date = new Date(input);

    if (isNaN(date.getTime())) {
      throw new Error('Fecha inválida');
    }

    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  onSaveSuccess(): void {
    this.cargarLista();
  }

}
