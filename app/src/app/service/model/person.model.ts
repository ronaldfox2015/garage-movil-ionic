export class PersonModel {
  nombres: string
  apellidos: string
  razonSocial: string
  idTipoDocumento: number
  numeroDocumento: string
  numeroCelular: string
  direccion: string
  logo: string


  constructor(nombres: string, apellido:string, idTipoDocumento: number, numeroCelular: string) {
    this.nombres = nombres;
    this.apellidos = apellido;
    this.razonSocial = '';
    this.idTipoDocumento = idTipoDocumento;
    this.numeroDocumento =  '';
    this.numeroCelular = numeroCelular;
    this.direccion = '';
    this.logo =  '';
  }
}
