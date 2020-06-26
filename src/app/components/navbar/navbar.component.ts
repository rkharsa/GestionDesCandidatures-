import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthGardService } from '../../pages/services/auth-gard.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as firebase from 'firebase';
import { AuthService } from '../../pages/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean;
  isCollapsed: boolean;

  constructor(location: Location,  private element: ElementRef,
    private router: Router,private authGuardService:AuthGardService,private authService:AuthService) {


  }

  ngOnInit() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }


  signOut() {
    this.authService.signOutUser();
  }

  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }


}
