import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
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

  // cuando le doy clic desde el boton nuevo
  editableTipoProyecto: TipoProyecto = {
    idtipo_proyecto: 0,
    nombre: '',
    comentario: '',
    estado: 'ACTIVO',
  }
  constructor(private cd: ChangeDetectorRef) {}
  // cada vez que cambieel input tipoProyecto (es decir cuando abramos el modal con datos)
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
    console.log("Guardar información");
    this.close();
  }

}
