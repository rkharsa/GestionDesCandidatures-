import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  errorMessage: any;
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.initSignUpForm();
  }


  public initSignUpForm() {
    this.emailCtrl = this.fb.control('', [Validators.email, Validators.required]);
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.signUpForm = this.fb.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });
  }
  public signUpSubmit(){
    this.authService.createNewUser(this.emailCtrl.value,this.passwordCtrl.value).then(
      ()=>{
        this.router.navigate(["/list"]);
      },(e)=>{
        this.errorMessage=e;
      }
    )
  }
}
