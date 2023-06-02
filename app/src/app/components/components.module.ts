import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from '../app-routing.module';
import {SliderComponent} from "./slider/slider.component";
import { PreloadImageComponent } from "./preload-image/preload-image.component";

@NgModule({
  declarations: [
    SliderComponent,
    PreloadImageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule
  ],
  exports: [
    SliderComponent,
    PreloadImageComponent
  ]
})
export class ComponentsModule { }
