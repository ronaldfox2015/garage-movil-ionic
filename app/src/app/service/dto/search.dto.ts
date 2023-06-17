export class SearchDto {
  static format(data: GarageDTO[]): Search[] {
    const modelSearch: Search[] = []
    data.forEach((item: GarageDTO)=>{
      const model: Search = {
        id : Number(item.idCochera),
        image: 'https://diariocorreo.pe/resizer/HydYFCPrgvWmoUCe7S-7cG-qfpY=/980x528/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/WNI73BPNWFCWVLTIIIEKVIV57E.jpg',
        title: String(item.nombre),
        location: String(item.direccion),
        description: String(item.condiciones),
        vehicleCapacity:Number(item.capacidadVehiculos)
      }
      modelSearch.push(model)
    })
    return modelSearch
  }
}

export interface Search {
  id: number
  image: string
  title: string
  location: string
  description: string
  vehicleCapacity: number
}

export interface GarageDTO {
  idCochera: number;
  idPersona: number;
  idUbicacion: number;
  nombre: string;
  direccion: string;
  capacidadVehiculos: number;
  banner: string;
  condiciones: string;
  diasAntelacionReserva: number;
  horasAntelacionReserva: number;
  tiempoTolerancia: string;
  fechaCreacion: string;
  idUsuarioModificacion: number;
  fechaActualizacion: string;
  estado: number;
}
