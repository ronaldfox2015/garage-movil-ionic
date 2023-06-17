import { Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private storage: Storage, private router: Router) { }

  async ngOnInit() {
    await this.storage.create()
    await this.storage.clear()
    await this.router.navigate(['/']);

  }

}
