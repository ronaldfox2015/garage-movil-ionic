import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';

  }

  ngOnInit() {
  }
  onSubmit() {
    // Lógica para enviar los datos del formulario al servidor y autenticar al usuario
    console.log('Correo electrónico:', this.email);
    console.log('Contraseña:', this.password);
  }

  loginWithGoogle() {

  }

  loginWithFacebook() {

  }
}
