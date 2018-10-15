import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';

//Import all shared logic required for forms handling
import {CustomValidators  } from '../../_helpers/custom.validators';
import {UserService } from '../../_services/user.service';

// Base 64 IMage display issues with unsafe image
import { DomSanitizer } from '@angular/platform-browser';

//User model
import {User} from '../../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup; 
  //Get error messages
  validation_messages = CustomValidators.getMessages();
  loading = false;
  httpMsgVisible = false; //Tells html to show result message
  httpMsgType = "error";  //Error or success
  httpMsgText='';         //http error if any  

  constructor(private userService: UserService,private router : Router,private _sanitizer: DomSanitizer) { }
  //Create the form
  createForm() {
    this.myForm =  new FormGroup({    
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        CustomValidators.validPassword
      ])),
      keepconnected: new FormControl('',null)
    });
  }

  //Reset the form
  resetForm() {
    this.myForm.reset();
    this.httpMsgVisible = false;
  }

  ngOnInit() {
    this.createForm();
  }
//From submit
onSubmit(value) {
  if (this.myForm.invalid) {
    return;
  }
  this.httpMsgVisible = false;
  this.loading = true;
  //request http here !
  this.userService.login(value.email,value.password).subscribe(
      (user: User) => {
          user.isLoggedIn = true; //Update user loggin status
          this.userService.setCurrent(user);
          //Redirect to home
          this.router.navigate(['']);  
      },
      error => {
          this.httpMsgText = error;
          this.httpMsgType = "error";
          this.httpMsgVisible = true;
          this.loading = false;
      });
  }  

}
