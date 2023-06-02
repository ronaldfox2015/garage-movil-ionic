export class UserModel {
  email: string= '';
  password: string= '';
  type: string = ''

  constructor(email: string, password: string, type: string) {
    this.email = email;
    this.password = password;
    this.type = type;
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

  public static validateEmail(email: string): Validate {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let response: Validate = {
      message : '',
      status : true,
      class: 'hidden'
    }
    if (regex.test(email)) {
      response.message = 'El correo electrónico es válido'
      response.status = true
      response.class = 'hidden'
    } else {
      response.status = false
      response.message = 'El correo electrónico no es válido'
      response.class = ''

    }
    return response
  }

  public static validate(input: string): Validate {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let response: Validate = {
      message : '',
      status : true,
      class: 'hidden'
    }
    if (regex.test(input)) {
      response.message = 'El correo electrónico es válido'
      response.status = true
      response.class = 'hidden'
    } else {
      response.status = false
      response.message = 'El correo electrónico no es válido'
      response.class = ''

    }
    return response
  }

  public static htmlError(message: string): string {
    return `hidden`;
  }

}

export interface Validate {
  message: string
  status: boolean
  class: string
}
