import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { LoginService } from '@services/login.service';
import { Login } from '@interfaces/Login';
import { CommonModule } from '@angular/common';
const PRIMENG_MODULES = [CheckboxModule,FormsModule,ButtonModule,InputTextModule,PasswordModule,RippleModule];
@Component({
  selector: 'app-login',
  imports: [PRIMENG_MODULES,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  checked: boolean = false;
  formularioLogin: FormGroup;
  mostrarLoading: boolean = false;

  constructor(private fb:FormBuilder){
    this.formularioLogin = this.fb.group({
      usuario:['',Validators.required],
      clave:['',Validators.required]
    });
  }

  private _serviceLogin = inject(LoginService);

  iniciarSession(){
    this.mostrarLoading = true;
    const request:Login = {
      Usuario:this.formularioLogin.value.usuario,
      Clave:this.formularioLogin.value.clave
    }

    this._serviceLogin.autenticar(request).subscribe({
      next: (data:any)=>{
        console.log('session correcta',data)
      },
      error:(data) =>{
        this.mostrarLoading=false;
        const mensaje = data.error['message'];
        alert(mensaje);
        console.log('error:',mensaje);
      },
      complete: () =>{
        this.mostrarLoading=false;
        console.log('Acción completada')
      }
    });


  }
}
