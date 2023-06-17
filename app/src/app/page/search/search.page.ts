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

  constructor(private searchService: SearchService, private router: Router, private storage: Storage) {
  }

  async ngOnInit() {
    this.searchResults  = await this.searchService.get();

  }

  async search() {
    this.searchResults = await this.searchService.get(this.searchTerm);

  }

  async adDetail(id: number) {
    await this.storage.create()
    await this.storage.set('garageId', JSON.stringify(id))
    console.log('garageId: ', id)
    this.router.navigate(['/ad-detail']);

  }
}
