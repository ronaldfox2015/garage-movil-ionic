import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from '../app-routing.module';
import {SliderComponent} from "./slider/slider.component";

@NgModule({
  declarations: [
    SliderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule
  ],
  exports: [
    SliderComponent
  ]
})
export class ComponentsModule { }
