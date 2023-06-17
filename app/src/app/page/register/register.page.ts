import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Contact} from "../../model/contac";
import {UserService} from "../../service/user.service";
import {PersonService} from "../../service/person.service";
import {PersonModel} from "../../service/model/person.model";
import {Validate} from "../../service/model/Validation.model";
import {UserModel} from "../../service/model/user.model";
import {RoleService} from "../../service/role.service";
import {RoleModel} from "../../service/model/role.model";
import {ValidationRegisterModel} from "../../service/model/validation-register.model";
import {Storage} from "@ionic/storage";
import {Session} from "../../service/model/session.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  public contact: Contact;
  validateResponseService: Validate
  sub1: Subscription;
  email: any = '';
  password: any= '';
  cell: any= '';
  type: any= '';
  name: any= '';
  lastName: any= '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private personService: PersonService,
    private roleService: RoleService,
    private storage: Storage
  ) {
    this.contact = new Contact();
    this.sub1 = new Subscription();
    this.validateResponseService = {
      status : true,
      message: '',
      class: 'hidden'
    }
  }

  ngOnInit() {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  async register() {
    const validate = new ValidationRegisterModel(this.email, this.password, this.cell, this.type, this.name, this.lastName)
    this.validateResponseService = validate.validate()
    console.log(this.validateResponseService)
    if (this.validateResponseService.status) {
      const modelPersson = new PersonModel(this.name, this.lastName, Number(this.type), this.cell)
      await this.personService.add(modelPersson).subscribe(
        async (response) => {
          this.validateResponseService.message = response.mensaje
          if (response.idError) {
            this.validateResponseService.status = false
            this.validateResponseService.class = ''
          } else {
            const personId = response.idPersona
            const modelUser = new UserModel(personId, Number(this.type), this.email, this.password)
            await this.userService.add(modelUser).subscribe(
              async (response) => {
                this.validateResponseService.message = response.mensaje
                if (response.idError) {
                  this.validateResponseService.status = false
                  this.validateResponseService.class = ''
                } else {
                  const roleModel = new RoleModel(personId, response.idUsuario, Number(this.type))
                  await this.roleService.add(roleModel).subscribe(
                    async (response) => {
                      console.log(response)
                      await this.storage.create()
                      const session: Session = {
                        user: await this.userService.get(roleModel.idUsuario),
                        email: this.email,
                        message: 'Bienvenido ' + this.email,
                        role: Number(this.type)
                      }
                      this.storage.set('session', JSON.stringify(session));
                      this.validateResponseService.status = true
                      this.validateResponseService.class = 'hidden'
                      this.validateResponseService.message = ''
                      window.location.assign('/search');
                    },
                    (error) => {
                      console.log(error)

                    },
                  );
                }
              }, (error: any) => {
                this.validateResponseService.message = error.mensaje
                this.validateResponseService.status = false
                this.validateResponseService.class = ''
              }
            );
          }

        },
        (error: any) => {
          this.validateResponseService.message = error.retorno.mensaje
          this.validateResponseService.status = false
          this.validateResponseService.class = ''
        }
      )
    }
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}

