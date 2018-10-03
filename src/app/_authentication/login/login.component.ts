import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
//Import all shared logic required for forms handling
import {CustomValidators  } from '../../_helpers/custom.validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup; 
  //Get error messages
  validation_messages = CustomValidators.getMessages();
  constructor() { }
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
  }

  ngOnInit() {
    this.createForm();
  }
//From submit
onSubmit(value) {
 
  if (this.myForm.valid) {
    console.log("Valid form!");
  } else {
    console.log("Invalid form!");
  }
 }
}
