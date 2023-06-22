import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {
  personId: number = 0;
  locationId: number= 0;
  name: string = '';
  address: string = '';
  vehicleCapacity: number = 0;
  banner: string = '';
  conditions: string = '';
  daysBeforeReservation: number = 0;
  hoursBeforeReservation: number= 0;
  toleranceTime: string='';
  validateResponseService: any;
  selectedFile: File;

  constructor(
  ) {
    this.validateResponseService = {
      status: true,
      message: '',
      class: 'hidden'
    }
  }

  ngOnInit() {
  }

  async publish() {

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log( event.target.files[0])
  }
}
