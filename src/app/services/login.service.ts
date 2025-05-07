import { inject, Injectable } from '@angular/core';
import { Login } from '@interfaces/Login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient); // Me permite hacer peticiones http a un servidor
  constructor() { }

  autenticar(data:Login):Observable<Login>{
    return this.http.post<Login>('http://127.0.0.1:8000/api/autenticar',data);
  }

}
