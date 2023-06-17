import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdDetailPageRoutingModule } from './ad-detail-routing.module';
import {Storage} from "@ionic/storage";

import { AdDetailPage } from './ad-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdDetailPageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [ ],
  declarations: [AdDetailPage],
  providers: [
    Storage
  ]
})
export class AdDetailPageModule {}
