import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Storage} from "@ionic/storage";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [LoginPage],
  providers: [
    Storage
  ]
})
export class LoginPageModule {}
