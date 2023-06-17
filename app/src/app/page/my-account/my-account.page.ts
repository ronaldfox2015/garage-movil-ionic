import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  register() {

  }
}
