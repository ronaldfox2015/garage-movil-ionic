export class RoleModel {
  idPersona:number
  idUsuario: number
  idRol: number

  constructor(idPersona: number, idUsuario: number, idRol: number) {
    this.idPersona = idPersona;
    this.idUsuario = idUsuario;
    this.idRol = idRol;
  }
}
