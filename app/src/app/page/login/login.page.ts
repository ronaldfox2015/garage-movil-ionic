import {Component, OnInit} from '@angular/core';
import { UserService } from './../../service/user.service';
import {UserModel, Validate} from "../../service/model/user.model";

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  email: string= '';
  password: string= '';
  type: string = ''
  validateEmail: Validate
  validatePassword: Validate
  validateTypeUser: Validate
  validateResponseService: Validate

  constructor(private userService: UserService) {
    this.validateEmail = {
      status : true,
      message: '',
      class: 'hidden'
    }
    this.validatePassword = {
      status : true,
      message: '',
      class: 'hidden'
    }
    this.validateTypeUser = {
      status : true,
      message: '',
      class: 'hidden'
    }
    this.validateResponseService = {
      status : true,
      message: '',
      class: 'hidden'
    }
  }

  ngOnInit() {
  }

  async onSubmit() {
    console.log('event: ', this)
    this.validateEmail = UserModel.validateEmail(this.email)
    if (this.validateEmail.status) {
      this.validateEmail = UserModel.validateRequired(this.email, 'email')
      this.validatePassword = UserModel.validateRequired(this.password, 'password')
      this.validateTypeUser = UserModel.validateRequired(this.type, 'tipo usuario')
      if (this.validateEmail.status && this.validatePassword.status && this.validateTypeUser.status){
        this.userService.login(this.email, this.password, Number(this.type)).subscribe(
          (response) => {
            this.validateResponseService.message = response.retorno.mensaje
            if(response.retorno.idError) {
              this.validateResponseService.status = false
              this.validateResponseService.class = ''
            }

          },
          (error: any) => {
            this.validateResponseService.message = error.retorno.mensaje
            this.validateResponseService.status = false
            this.validateResponseService.class = ''
          }
        );
      }

    }
  }

  facebookSignIn() {

  }

  googleSignIn() {

  }

}
