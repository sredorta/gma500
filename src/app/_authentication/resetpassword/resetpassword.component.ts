import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {  FormGroup,FormControl,Validators } from '@angular/forms';
//Import all shared logic required for forms handling
import {CustomValidators  } from '../../_helpers/custom.validators';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  myForm: FormGroup;
  //Get error messages
  validation_messages = CustomValidators.getMessages();

  constructor(private _location: Location) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))
    });
  }
  //Submit the form
  onSubmit(value) {
    if (this.myForm.valid) {
      console.log("form is valid");
    } else {
      console.log("form is invalid !");
    }
  }
  //Go back if we cancel
  goBack() {
    this._location.back(); 
  }
}
