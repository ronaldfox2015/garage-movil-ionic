import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private router: Router) {
    // FB.init({
    //   appId: 'TU_APP_ID',
    //   cookie: true,
    //   xfbml: true,
    //   version: 'v13.0'
    // });

  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }
}
