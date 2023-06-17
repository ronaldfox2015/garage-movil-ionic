import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-button-redirect',
  templateUrl: './button-redirect.component.html',
  styleUrls: ['./button-redirect.component.scss'],
})
export class ButtonRedirectComponent  implements OnInit {
  @Input() textoBoton: string;
  @Output() botonClickeado: EventEmitter<any> = new EventEmitter<any>();
  constructor(private router: Router) { }

  ngOnInit() {}
  onClick(page:string = ''): void {
    this.router.navigate([`/${page}`]);
  }
}
