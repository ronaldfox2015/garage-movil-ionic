import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  pay() {
    // const mercadopago = require('mercadopago');
    // mercadopago.configurations.setAccessToken('APP_USR-3286727047252609-061600-ab523f317abc45211be949d4882b7f59-798143551');
    // const payment_data = {
    //   transaction_amount: 15,
    //   token: 'ff8080814c11e237014c1ff593b57b4d',
    //   installments: 1,
    //   payer: {
    //     type: "customer",
    //     id: "123456789-jxOV430go9fx2e"
    //   }
    // };
    // mercadopago.payment.create(payment_data).then(function (data) {
    //   console.log(data);
    // });

    // window.location.assign('https://mpago.la/1saUyfd');
  }
}
