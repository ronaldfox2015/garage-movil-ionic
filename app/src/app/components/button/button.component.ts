import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  implements OnInit {
  @Input() textoBoton: string= '';
  @Output() botonClickeado: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onClick(): void {
    this.botonClickeado.emit();
  }

}
