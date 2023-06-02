import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  item: any;

  constructor() { }

  ngOnInit() {
    this.item =       {
      image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
      title: "Solvir",
      description: "dsfasfasdfasfalsdfalsdfadsfkñasdfk"
    };
  }

}
