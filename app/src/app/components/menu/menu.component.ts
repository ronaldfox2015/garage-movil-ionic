import { Component, Input, OnInit } from '@angular/core';
import { MenuDto, MenuObject } from "../../service/dto/menu.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  @Input() message: string = '';
  @Input() list: MenuObject[] = []

  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
    console.log(this.list)
  }

  onclick (href: string){
    if (href  === '/logout'){
      this.list = [
        new MenuObject('/search', 'Buscador de Cocheras'),
        new MenuObject('/', 'Home')
      ]
      this.message = 'HappyParking'
    }
    this.router.navigate([href]);
  }

}
