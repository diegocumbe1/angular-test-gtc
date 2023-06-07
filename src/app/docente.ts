export class Docente {
  id?:number;
  id_tipodocumento: number;
  numerodocumento: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  asig_dictadas: number;
  grado_escolaridad: string;
  id_gradoresponsable: number;
  email: string;
  fijo: string;
  celular: string;

  constructor(){
    this.id = -1;
    this.id_tipodocumento= -1;
    this.numerodocumento= -1;
    this.nombres= "";
    this.apellidos= "";
    this.fecha_nacimiento= "";
    this.asig_dictadas= -1;
    this.grado_escolaridad= "";
    this.id_gradoresponsable= -1;
    this.email= "";
    this.fijo= "";
    this.celular= "";
  }

}
