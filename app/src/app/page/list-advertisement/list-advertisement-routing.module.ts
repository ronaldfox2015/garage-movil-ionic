import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAdvertisementPage } from './list-advertisement.page';

const routes: Routes = [
  {
    path: '',
    component: ListAdvertisementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAdvertisementPageRoutingModule {}
