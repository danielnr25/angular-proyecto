import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import { MessageService } from 'primeng/api';
import { TipoProyectoService } from '@services/tipo-proyecto.service';
import { response } from 'express';
const PRIMENG_MODULES = [ButtonModule,DialogModule,RadioButtonModule,InputNumberModule,TextareaModule,InputTextModule];
@Component({
  selector: 'app-modal',
  imports: [PRIMENG_MODULES,FormsModule,CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() display: boolean = false;
  @Input() mode: 'create' |'edit' = 'create';
  @Input() tipoProyecto: TipoProyecto | null = null;

  // inyeccion del servicio tipoproyecto
  private _svTipoProyecto = inject(TipoProyectoService);

  // cuando le doy clic desde el boton nuevo
  editableTipoProyecto: TipoProyecto = {
    idtipo_proyecto: 0,
    nombre: '',
    comentario: '',
    estado: 'ACTIVO',
  }

  constructor(private cd: ChangeDetectorRef, private messageService: MessageService) {}
  // cada vez que cambie el input tipoProyecto (es decir cuando abramos el modal con datos)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipoProyecto'] && this.tipoProyecto) {
      this.editableTipoProyecto = { ...this.tipoProyecto };
    } else if (this.mode === 'create') {
      // si es modo crear, resetea el objeto
      this.editableTipoProyecto = {
        idtipo_proyecto: 0,
        nombre: '',
        comentario: '',
        estado: 'ACTIVO',
      };
      this.cd.detectChanges();
    }
  }


  // eventos
  @Output() closeModal = new EventEmitter<void>(); // evento closeModal

  close(){
    this.closeModal.emit();
  }

  guardar(){
    if(!this.editableTipoProyecto.nombre || !this.editableTipoProyecto.comentario){
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos requeridos',
        detail: 'Debe ingresar nombre y comentario',
        life:3000
      })
      return
    }
    if(this.mode==='create'){
      this._svTipoProyecto.agregarTipoProyecto(this.editableTipoProyecto).subscribe({
        next:(response) =>{
          this.messageService.add({
            severity:'success',
            summary:'Registrando',
            detail:response,
            life:3000
          })
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
      this.close();
    }else{
     this._svTipoProyecto.actualizarTipoProyecto(this.editableTipoProyecto).subscribe({
        next:(response) =>{
          this.messageService.add({
            severity:'success',
            summary:'Actualizando',
            detail:response,
            life:3000
          })
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
      this.close();
    }
  }

}
