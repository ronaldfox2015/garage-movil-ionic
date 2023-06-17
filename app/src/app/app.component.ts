import {Component, OnInit} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Session} from "./service/model/session.model";
import {MenuDto, MenuObject} from "./service/dto/menu.dto";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  session: Session | null
  black: string = ''
  message: any;
  list: MenuObject[] = [];

  constructor(private storage: Storage) {
    this.session = {
      email: '',
      user: {},
      message: 'HappyParking',
      role: 0
    }
  }

  async ngOnInit(): Promise<void> {
    this.session = await this.sessionStorage();
    if (this.session === null) {
      this.session = {
        email: '',
        user: {},
        message: 'HappyParking',
        role: 0
      }
    }
    this.message = this.session.message
    const modelMenu = new MenuDto(this.session.role)
    await this.addMenu(modelMenu.getData())
    this.list = await this.getMenu()
  }

  async sessionStorage(): Promise<Session | null>{
    await this.storage.create();
    return JSON.parse(await this.storage.get('session')) as Session
  }

  async addMenu(list: MenuObject[]) {
    await this.storage.create();
    await this.storage.set('menu', JSON.stringify(list));
  }

  async getMenu(): Promise<MenuObject[]> {
    return JSON.parse(await this.storage.get('menu')) as MenuObject[]
  }

}


