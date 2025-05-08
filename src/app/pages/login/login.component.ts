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
import { ToastService } from '@services/toast.service';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
const PRIMENG_MODULES = [CheckboxModule,FormsModule,ButtonModule,InputTextModule,PasswordModule,RippleModule,ToastModule];
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

  constructor(private fb:FormBuilder,private _toastService:ToastService){
    this.formularioLogin = this.fb.group({
      usuario:['',Validators.required],
      clave:['',Validators.required]
    });
  }

  private _serviceLogin = inject(LoginService);
  private _router = inject(Router);
  iniciarSession(){
    this.mostrarLoading = true;
    const request:Login = {
      Usuario:this.formularioLogin.value.usuario,
      Clave:this.formularioLogin.value.clave
    }

    this._serviceLogin.autenticar(request).subscribe({
      next: (data:any)=>{
        const message = data['message'];
        const response = data['data'];
        const token = data['token'];
        const permisos = data['permisos'];
        //console.log(message);
        //console.log(response);
        //console.log(token);
        //console.log(permisos);
        localStorage.setItem("token",token);
        localStorage.setItem("idperfil",response.idperfil);
        localStorage.setItem("nombre",response.nombre);
        localStorage.setItem("permisos",JSON.stringify(permisos));
        this._router.navigate(['/admin']);
      },
      error:(data) =>{
        this.mostrarLoading=false;
        const mensaje = data.error['message'];
        //alert(mensaje);
        //this._toastService.showErrorViaToast(mensaje);
        this._toastService.showToast("error",'Error',mensaje)
        console.log('error:',mensaje);
      },
      complete: () =>{
        this.mostrarLoading=false;
        console.log('Acción completada')
      }
    });


  }
}
