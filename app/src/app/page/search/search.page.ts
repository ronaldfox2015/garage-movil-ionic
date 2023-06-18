import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {SearchService} from "../../service/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  item: any;
  searchTerm: any;
  searchResults: any;
  page : number = 1
  rows: number = 5
  garageId: number = 0
  session: any = null
  constructor(private searchService: SearchService, private router: Router, private storage: Storage) {
  }

  async ngOnInit() {
    this.searchResults  = await this.searchService.get();
    this.sessionUser()
  }
  async sessionUser(){
    await this.storage.create()
    this.garageId = await this.storage.get('garageId')
    this.session = JSON.parse(await this.storage.get('session'))
    if (this.session === null){
      this.router.navigate(['/login']);

    }
  }
  async search() {
    console.log(this.searchTerm)
    this.page = 1
    this.rows = this.rows + 5
    this.searchResults = await this.searchService.get(this.searchTerm, this.page, this.rows);

  }

  async adDetail(id: number) {
    await this.storage.create()
    await this.storage.set('garageId', JSON.stringify(id))
    console.log('garageId: ', id)
    this.router.navigate(['/ad-detail']);

  }

  async onScroll(event: any) {
    this.page = 1
    this.rows = this.rows + 5

    this.searchResults  = await this.searchService.get('', this.page, this.rows);
    console.log(this.searchResults)

    event.target.complete();

  }
}
