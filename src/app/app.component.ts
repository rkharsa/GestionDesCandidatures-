import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import * as firebase from 'firebase';
import { Todo } from './models/todo.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formGroupSearch: FormGroup;
  isAuth: boolean;
  loadingIndicator: boolean;
  constructor(private todoService: TodoService, private authService: AuthService, private _route: Router) {
    const config = {
      apiKey: "AIzaSyCjY_7GsbSKfQrpKbcFWgRCMmL7SONSgTg",
      authDomain: "todoproject-e2328.firebaseapp.com",
      databaseURL: "https://todoproject-e2328.firebaseio.com",
      projectId: "todoproject-e2328",
      storageBucket: "todoproject-e2328.appspot.com",
      messagingSenderId: "158804959407"
    };
    firebase.initializeApp(config);


    this._route.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.loadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        this.loadingIndicator = false;
      }
    });

  }

  ngOnInit() {
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
}
