import {GarageDTO, Search} from "./search.dto";

export class GarageDetailDto {
  static format(data: GarageDTO): Search {
    const model: Search = {
      id: Number(data.idCochera),
      image: 'https://diariocorreo.pe/resizer/HydYFCPrgvWmoUCe7S-7cG-qfpY=/980x528/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/WNI73BPNWFCWVLTIIIEKVIV57E.jpg',
      title: String(data.nombre),
      location: String(data.direccion),
      description: String(data.condiciones),
      vehicleCapacity: Number(data.capacidadVehiculos)
    }
    return model
  }
}
