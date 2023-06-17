import {Component, OnInit} from '@angular/core';
import { UserService } from './../../service/user.service';
import {ValidationModel, Validate} from "../../service/model/Validation.model";
import {Router} from "@angular/router";
import { Storage } from '@ionic/storage';
import {Session} from "../../service/model/session.model";
import {MenuDto} from "../../service/dto/menu.dto";

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

  constructor(private userService: UserService, private router: Router,private storage: Storage) {
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
    this.storage.create();

  }

  async onSubmit() {
    console.log('event: ', this)
    this.validateEmail = ValidationModel.validateEmail(this.email)
    if (this.validateEmail.status) {
      this.validateEmail = ValidationModel.validateRequired(this.email, 'email')
      this.validatePassword = ValidationModel.validateRequired(this.password, 'password')
      this.validateTypeUser = ValidationModel.validateRequired(this.type, 'tipo usuario')
      if (this.validateEmail.status && this.validatePassword.status && this.validateTypeUser.status){
        await this.userService.login(this.email, this.password, Number(this.type)).subscribe(
          async (response) => {
            console.log(response)
            this.validateResponseService.message = response.retorno.mensaje
            if (response.retorno.idError) {
              this.validateResponseService.status = false
              this.validateResponseService.class = ''
            } else {
              const session: Session = {
                user: await this.userService.get(response.idUsuario),
                email: this.email,
                message: 'Bienvenido ' + this.email,
                role: response.idTipoUsuario
              }
              await this.storage.set('session', JSON.stringify(session));
              const modelMenu = new MenuDto(response.idTipoUsuario)
              await this.storage.set('menu', JSON.stringify(modelMenu.getData()))
              window.location.assign('/search');
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
