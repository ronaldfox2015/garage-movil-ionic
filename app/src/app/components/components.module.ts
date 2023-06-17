import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from '../app-routing.module';
import {SliderComponent} from "./slider/slider.component";
import { PreloadImageComponent } from "./preload-image/preload-image.component";
import {MenuComponent} from "./menu/menu.component";
import {BackComponent} from "./back/back.component";

@NgModule({
  declarations: [
    SliderComponent,
    MenuComponent,
    BackComponent,
    PreloadImageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule
  ],
  exports: [
    SliderComponent,
    MenuComponent,
    BackComponent,
    PreloadImageComponent
  ]
})
export class ComponentsModule { }
