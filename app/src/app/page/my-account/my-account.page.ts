import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {PersonService} from "../../service/person.service";
import {PersonModel} from "../../service/model/person.model";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  name: any;
  lastName: any;
  businessName: any;
  documentType: any;
  documentNumber: any;
  cell: any;
  validateResponseService: any;
  session: any = null
  personModel: any

  constructor(private personService: PersonService, private router: Router, private storage: Storage) {
    this.validateResponseService = {
      status: true,
      message: '',
      class: 'hidden'
    }

  }

  async ngOnInit() {
    await this.sessionUser()
    await this.person()

  }

  async register():Promise<void> {
    const modelPersson = PersonModel.create(
      this.name,
      this.lastName,
      this.businessName,
      this.documentType,
      this.documentNumber,
      this.cell,
      '',
      ''
    )
    await this.personService.update(Number(this.session.user.idPersona), modelPersson)
    window.location.assign('/my-account');

  }

  async person(): Promise<void> {
    this.personModel = await this.personService.getById(this.session.user.idPersona);
    this.name = this.personModel.nombres
    this.lastName = this.personModel.apellidos
    this.businessName = this.personModel.nombres
    this.documentType = this.personModel.idTipoDocumento
    this.documentNumber = this.personModel.numeroDocumento
    this.cell = this.personModel.numeroCelular
  }

  async sessionUser() {
    await this.storage.create()
    this.session = JSON.parse(await this.storage.get('session'))
    if (this.session === null) {
      this.router.navigate(['/login']);
    }
  }
}
