import { inject, Injectable } from '@angular/core';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoProyectoService {
  urlApi:string = environment.api
  constructor(private http:HttpClient) { } // Me permite hacer peticiones http a un servidor

 getTipoProyectos():Observable<TipoProyecto[]>{
  return this.http.get<{message:string;data:TipoProyecto[]}>(`${this.urlApi}/tipo_proyectos`).pipe(
    map(response=>response.data)
  );
 }

 agregarTipoProyecto(dato:TipoProyecto){
  return this.http.post<{message:string;data:TipoProyecto[]}>(`${this.urlApi}/tipo_proyectos`,dato).pipe(
    map(response =>response.message)
  );
 }

 actualizarTipoProyecto(dato:TipoProyecto){
  return this.http.put<{message:string;data:TipoProyecto[]}>(`${this.urlApi}/tipo_proyectos/${dato.idtipo_proyecto}`,dato).pipe(
    map(response =>response.message)
  );
 }

 eliminarTipoProyecto(id:number):Observable<{message:string}>{
  return this.http.delete<{message:string}>(`${this.urlApi}/tipo_proyectos/${id}`);
 }

}
