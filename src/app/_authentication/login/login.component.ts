import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Subscription } from 'rxjs';

//Import all shared logic required for forms handling
import {CustomValidators  } from '../../_helpers/custom.validators';
import {UserService } from '../../_services/user.service';

// Base 64 IMage display issues with unsafe image
import { DomSanitizer } from '@angular/platform-browser';

//User model
import {User, UserMultipleAccessInterface} from '../../_models/user';
import { MatRadioChange } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  accessAvailable = new Array<string>() 
  accessSelected : string = null;
  myForm: FormGroup; 
  //Get error messages
  validation_messages = CustomValidators.getMessages();
  loading = false;
  httpMsgVisible = false; //Tells html to show result message
  httpMsgType = "error";  //Error or success
  httpMsgText='';         //http error if any  
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private userService: UserService,private router : Router, private location : Location, private _sanitizer: DomSanitizer) { }
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

  resetAccess() {
    this.accessAvailable = new Array<string>(); //Reset the access of the account
    this.accessSelected = null;
  }
  //Reset the form
  resetForm() {
    this.myForm.reset();
    this.resetAccess();
    this.httpMsgVisible = false;
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
  //Detect changes on multiple accounts radio button
  radioChange(event: MatRadioChange) {
    this.accessSelected = event.value;
  }
  //When email changes we reset the access to not be showing
  emailChange(event) {
    this.resetAccess();
  }

  //From submit
  onSubmit(value) {
    if (this.myForm.invalid) {
      return;
    }
    this.httpMsgVisible = false;
    this.loading = true;

    //request http here !
    this._subscriptions.push(this.userService.login(value.email,value.password,value.keepconnected,this.accessSelected).subscribe(
        (result : any) => {
          //We check if we got multiple access
          if (result.response === "multiple_access") {
            //Update the html to show the available access
            this.accessAvailable = result.message;
            this.accessSelected = result.message[0];
          } else {
            User.saveToken(result.token);   //Save Token to session storage
            //We need to download here the profile of the user
            this._subscriptions.push(this.userService.getAuthUser().subscribe(res=> {
              console.log("After getAuthUser");
              console.log(res);
              this.userService.setCurrent(res as User); 
              this.location.back();
            }));
          }
          this.loading=false;
        },
        error => {
            this.httpMsgText = error;
            this.httpMsgType = "error";
            this.httpMsgVisible = true;
            this.loading = false;
        }));
    }  

}
