import {Validate} from "./Validation.model";

export class ValidationRegisterModel {
  email: any = '';
  password: any;
  cell: any;
  type: any;
  name: any;
  lastName: any;


  constructor(email: any, password: any, cell: any, type: any, name: any, lastName: any) {
    this.email = email;
    this.password = password;
    this.cell = cell;
    this.type = type;
    this.name = name;
    this.lastName = lastName;
  }

  validate(): Validate {
    const name = ValidationRegisterModel.validateRequired(this.name, 'Nombre')
    const lastName = ValidationRegisterModel.validateRequired(this.lastName, 'Apellidos')
    const email = ValidationRegisterModel.validateRequired(this.email, 'Correo electrónico')
    const password = ValidationRegisterModel.validateRequired(this.password, 'Contraseña')
    const cell = ValidationRegisterModel.validateRequired(this.cell, 'Cell')
    const type = ValidationRegisterModel.validateRequired(this.type, 'Tipo de Usuario')
    if (!name.status){
      return name
    }
    if (!lastName.status){
      return lastName
    }
    if (!email.status){
      return email
    }

    if (!password.status){
      return password
    }

    if (!cell.status){
      return password
    }

    if (!type.status){
      return type
    }

    return {
      status: true,
      message: 'validaciones correctas',
      class: 'hidden'
    }
  }

  public static validateRequired(input: string, type: string): Validate {
    let response: Validate = {
      message : '',
      status : true,
      class: 'hidden'
    }
    if (input.length == 0) {
      response.message = `El campo ${type} es requerido`
      response.status = false
      response.class = ''
    }
    return  response
  }
}
