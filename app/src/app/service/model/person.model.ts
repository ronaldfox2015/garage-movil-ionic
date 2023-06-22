export class PersonModel {
  nombres: string
  apellidos: string
  razonSocial: string
  idTipoDocumento: number
  numeroDocumento: string
  numeroCelular: string
  direccion: string
  logo: string

  constructor(
    nombres: string = '',
    apellido:string= '',
    idTipoDocumento: number= 0,
    numeroCelular: string= '') {
      this.nombres = nombres;
      this.apellidos = apellido;
      this.razonSocial = '';
      this.idTipoDocumento = idTipoDocumento;
      this.numeroDocumento =  '';
      this.numeroCelular = numeroCelular;
      this.direccion = '';
      this.logo =  '';
    }

  static create(
    name: string,
    lastName: string,
    businessName: string,
    documentTypeId: number,
    documentNumber: string,
    cellPhone: string,
    address: string,
    logo: string): PersonModel {
    const model = new PersonModel();
    model.nombres = name;
    model.apellidos = lastName;
    model.razonSocial = businessName;
    model.idTipoDocumento = documentTypeId;
    model.numeroDocumento = documentNumber;
    model.numeroCelular = cellPhone;
    model.direccion = address;
    model.logo = logo;
    return model
  }
}
