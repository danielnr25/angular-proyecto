import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
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
import { TipoProyectoService } from '@services/tipo-proyecto.service';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import { ModalComponent } from './modal/modal.component';
const PRIMENG_MODULES = [TableModule,InputIconModule,IconFieldModule,MultiSelectModule,InputTextModule,SelectModule,SliderModule,ProgressBarModule,TagModule,ButtonModule,ConfirmDialogModule,ToastModule];
@Component({
  selector: 'app-tipo-proyecto',
  standalone: true,
  imports: [PRIMENG_MODULES,CommonModule,FormsModule,ModalComponent],
  templateUrl: './tipo-proyecto.component.html',
  styleUrl: './tipo-proyecto.component.css',
  providers: [MessageService, ConfirmationService]
})
export class TipoProyectoComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  tipoProyectos: TipoProyecto[] = [];
  loadingTipoProyectos: boolean = true;
  // Servicios del tipo_proyecto
  private _svTipoProyecto = inject(TipoProyectoService);

  // VARIABLES PARA EL USO DEL MODAL
  showModal = false; // booleano para poder iniciarlo el valor del modal
  editMode: 'create' | 'edit' = 'create'; // propiedad para saber desde que boton estoy clic
  selectedTipoProyecto!: TipoProyecto | null;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void { // se ejecuta ni bien inicializa el componente
    this._svTipoProyecto.getTipoProyectos().subscribe({
      next:(data)=>{
        this.tipoProyectos = data;
        this.loadingTipoProyectos = false;
        //console.log(this.tipoProyectos)
        //console.log("Listado de tipos de proyectos: ",data);
      },
      error:(data)=>{
        console.error("Error data",data);
      },
      complete:()=>{
        //console.log("Se termino la ejecucion");
        this.loadingTipoProyectos = false;
      }
    });

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

  openModalCreate(){
    this.editMode = 'create';
    this.showModal = true;
    this.selectedTipoProyecto = {
      idtipo_proyecto: 0,
      nombre: '',
      comentario: '',
      estado: 'ACTIVO'
    };
  }

  openModalEdit(tipoProyecto:TipoProyecto):void{
    this.editMode = 'edit';
    this.showModal = true;
    this.selectedTipoProyecto = {...tipoProyecto}; // clonar el objeto con la finaliadad de evitar mutación directa
  }

  eliminarTipoProyecto(id:number):void{
    this._svTipoProyecto.eliminarTipoProyecto(id).subscribe({
      next: (response)=>{
        this.tipoProyectos = this.tipoProyectos.filter(tp => tp.idtipo_proyecto !== id);

        this.messageService.add({
          severity:'success',
          summary:'Eliminando',
          detail:response.message,
          life:3000
        })
      },
      error: (err) =>{
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:err.message,
          life:3000
        })
      }
    });
  }

  confirmarEliminacion(tipoProyecto:TipoProyecto){
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar el tipo de proyecto "${tipoProyecto.nombre}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarTipoProyecto(tipoProyecto.idtipo_proyecto)
      }
    });
  }



}
