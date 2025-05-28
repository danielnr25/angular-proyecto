export interface Proyecto {
  idproyecto:number,
  nombre:string,
  idtipo_proyecto:number,
  fecha_inicio: Date | string;
  fecha_fin: Date | string;
  detalle:string,
  estado:string,
  idusuario:number
}
