import { Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage";
import {SearchService} from "../../service/search.service";
import {PersonService} from "../../service/person.service";
import {Router} from "@angular/router";
import {ReservationService} from "../../service/reservation.service";

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.page.html',
  styleUrls: ['./ad-detail.page.scss'],
})
export class AdDetailPage implements OnInit {
  garageId: number = 0
  session: any = null
  brand: any;
  model: any;
  color: any;
  plateNumber: any;
  garageDetail: any;
  description: string = '';
  startDate: any;
  endDate: any;

  constructor(
    private storage: Storage,
    private searchService: SearchService,
    private personService: PersonService,
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.sessionUser()
    this.garage(this.garageId)
  }

  async ngOnInit() {
    console.log(this.session)
    console.log(this.garageId)
    console.log(this.garageDetail)
  }

  async sessionUser(){
    await this.storage.create()
    this.garageId = await this.storage.get('garageId')
    this.session = JSON.parse(await this.storage.get('session'))
    if (this.session === null){
      this.router.navigate(['/login']);
    }
  }

  async garage(garageId: number): Promise<void> {
    try {
      this.garageDetail = await this.searchService.getByGarageId(garageId)
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  }

  async submitFormVehicle() {
    console.log(this)

    const vehicles = await this.personService.saveReservation(
      {
        idPersona: this.session.user.idPersona,
        marca: this.brand,
        modelo: this.model,
        color: this.color,
        numeroPlaca: this.plateNumber,
        descripcion: this.description
      },
      this.garageId,
      this.startDate,
      this.endDate
    )
    this.router.navigate(['/payment']);



  }
}
