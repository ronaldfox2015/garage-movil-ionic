export interface Session {
  email: string
  user: SessionUser | unknown
  message: string
  role: number
}

export interface SessionUser {
  idUsuario: number
  idPersona: number
  idTipoUsuario: number
  correo: string
  clave: string
  fechaCreacion: string
  idUsuarioModificacion: number
  fechaActualizacion: string
  estado: number
}
