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
  public focus;
  public listTitles: any[];
  public location: Location;
  isAuth: boolean;

  constructor(location: Location,  private element: ElementRef,
    private router: Router,private authGuardService:AuthGardService,private authService:AuthService) {
    this.location = location;

  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
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
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return titlee;
  }


}
