import { ChangeDetectorRef, Component, EventEmitter, inject, Input, output, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { ProyectoService } from '@services/proyecto.service';
import { Proyecto } from '@interfaces/proyecto';
const PRIMENG_MODULES = [
  ButtonModule,
  DialogModule,
  RadioButtonModule,
  InputNumberModule,
  TextareaModule,
  InputTextModule,
];
@Component({
  selector: 'app-modal',
  imports: [PRIMENG_MODULES, FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() display: boolean = false;
  @Input() mode: 'create' |'edit' = 'create';
  @Input() proyecto: Proyecto | null = null;

  @Output() closeModal = new EventEmitter<void>(); // evento closeModal
  @Output() saveSuccess = new EventEmitter<void>();

  private _svProyecto = inject(ProyectoService);
  editableProyecto: Proyecto = {
    idproyecto: 0,
    nombre: '',
    idtipo_proyecto: 0,
    fecha_inicio: new Date(),
    fecha_fin: new Date(),
    estado: 'ACTIVO',
    detalle: '',
    idusuario: 0,
  }

  constructor(private cd: ChangeDetectorRef, private messageService: MessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proyecto'] && this.proyecto) {
      this.editableProyecto = { ...this.proyecto };
    } else if (this.mode === 'create') {
      // si es modo crear, resetea el objeto
      this.editableProyecto = {
        idproyecto: 0,
        nombre: '',
        idtipo_proyecto: 0,
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        estado: 'ACTIVO',
        detalle: '',
        idusuario: 0,
      };
      this.cd.detectChanges();
    }
  }

  close(){
    this.closeModal.emit();
  }

  guardar(){
    if(!this.editableProyecto.nombre || !this.editableProyecto.detalle){
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos requeridos',
        detail: 'Debe ingresar nombre y detalle del proyecto',
        life:3000
      })
      return
    }
    if(this.mode==='create'){
      this._svProyecto.agregarProyecto(this.editableProyecto).subscribe({
        next:(response) =>{
          this.messageService.add({
            severity:'success',
            summary:'Registrando',
            detail:response,
            life:3000
          })
          this.saveSuccess.emit();
          this.close();
        },
        error: (err) =>{
          console.log(err)
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:err.message,
            life:3000
          })
        }
      })
    }else{
     this._svProyecto.actualizarProyecto(this.editableProyecto).subscribe({
        next:(response) =>{
          this.messageService.add({
            severity:'success',
            summary:'Actualizando',
            detail:response,
            life:3000
          })
          this.saveSuccess.emit();
          this.close();
        },
        error: (err) =>{
          console.log(err)
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:err.message,
            life:3000
          })
        }
      })
    }
  }



}
