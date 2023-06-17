export class UserModel {
  idPersona: number
  idTipoUsuario: number
  correo: string
  clave: string



  constructor(idPersona: number, idTipoUsuario: number, correo: string, clave: string) {
    this.idPersona = idPersona;
    this.idTipoUsuario = idTipoUsuario;
    this.correo = correo;
    this.clave = clave;
  }
}
