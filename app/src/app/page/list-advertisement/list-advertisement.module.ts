import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAdvertisementPageRoutingModule } from './list-advertisement-routing.module';

import { ListAdvertisementPage } from './list-advertisement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAdvertisementPageRoutingModule
  ],
  declarations: [ListAdvertisementPage]
})
export class ListAdvertisementPageModule {}
