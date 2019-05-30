import { Component,OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import * as firebase from 'firebase';
import { Todo } from './models/todo.model';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
formGroupSearch :FormGroup;

  constructor(private todoService :TodoService){
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

  ngOnInit(){

  }
}
