export class VehiclesDto {
  vehiclesId: number = 0

  constructor(vehiclesId: number= 0) {
    this.vehiclesId = vehiclesId;
  }
}

export class Vehicles {
  idVehiculo: number = 0;
  idPersona: number = 0;
  marca: string = '';
  modelo: string = '';
  color: string = '';
  numeroPlaca: string = '';
  descripcion: string = '';
  fechaCreacion: string = '';
  idUsuarioModificacion: number = 0;
  fechaActualizacion: string = '';
  estado: number = 0;
}
