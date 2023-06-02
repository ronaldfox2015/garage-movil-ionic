import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Contact} from "../../model/contac";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  public contact: Contact;

  sub1: Subscription;

  constructor(    private activatedRoute: ActivatedRoute,
                  private router: Router) {
    this.contact = new Contact();
    this.sub1 = new Subscription();
  }

  ngOnInit() {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  register() {
    this.router.navigate(['/search']);

  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}

