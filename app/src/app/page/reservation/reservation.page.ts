import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  searchResults: any[]= [];

  constructor() { }

  ngOnInit() {
    this.searchResults = [
      {
        image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        title: "Solvir",
        location: "La victoria",
        description: "dsfasfasdfasfalsdfalsdfadsfkñasdfk"
      },
      {
        image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        title: "solgas",
        location: "San isidro",
        description: "dsfasfasdfasfalsdfalsdfadsfkñasdfk"
      },
      {
        image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        title: "pietro",
        location: "La Marina",
        description: "dsfasfasdfasfalsdfalsdfadsfkñasdfk"
      },
      {
        image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        title: "Solvir",
        location: "La victoria",
        description: "dsfasfasdfasfalsdfalsdfadsfkñasdfk"
      },
      {
        image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        title: "solgas",
        location: "San isidro",
        description: "dsfasfasdfasfalsdfalsdfadsfkñasdfk"
      },
      {
        image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        title: "pietro",
        location: "La Marina",
        description: "dsfasfasdfasfalsdfalsdfadsfkñasdfk"
      },
      {
        image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        title: "Solvir",
        location: "La victoria",
        description: "dsfasfasdfasfalsdfalsdfadsfkñasdfk"
      },
      {
        image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        title: "solgas",
        location: "San isidro",
        description: "dsfasfasdfasfalsdfalsdfadsfkñasdfk"
      },
      {
        image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        title: "pietro",
        location: "La Marina",
        description: "dsfasfasdfasfalsdfalsdfadsfkñasdfk"
      }
    ];
  }

}
