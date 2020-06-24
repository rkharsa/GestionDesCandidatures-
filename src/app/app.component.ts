import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';
  constructor(){
    const config = {
      apiKey: "AIzaSyCjY_7GsbSKfQrpKbcFWgRCMmL7SONSgTg",
      authDomain: "todoproject-e2328.firebaseapp.com",
      databaseURL: "https://todoproject-e2328.firebaseio.com",
      projectId: "todoproject-e2328",
      storageBucket: "todoproject-e2328.appspot.com",
      messagingSenderId: "158804959407"
    };
    firebase.initializeApp(config);
  }
}
