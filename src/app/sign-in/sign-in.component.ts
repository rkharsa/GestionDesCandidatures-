import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  errorMessage: any;
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.initSignInForm();
  }


  private initSignInForm() {
    this.emailCtrl = this.fb.control('', [Validators.email, Validators.required]);
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.signInForm = this.fb.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });
  }
  private signInSubmit(){
    this.authService.signInUser(this.emailCtrl.value,this.passwordCtrl.value).then(
      ()=>{
        this.router.navigate(["/list"]);
      },(e)=>{
        this.errorMessage=e;
      }
    )
  }
}
