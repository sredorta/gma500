import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
//Import all shared logic required for forms handling
import {CustomValidators, ParentErrorStateMatcher  } from '../../_helpers/custom.validators';
//Directives
import { OnlyNumberDirective } from '../../_directives/onlyNumber.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup; 
  //Get error messages
  validation_messages = CustomValidators.getMessages();
  constructor() { }
  //Create the form
  createForm() {
    this.myForm =  new FormGroup({    
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),         
      mobile: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),       
        CustomValidators.validMobile
      ])),       
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      matching_passwords_group : new FormGroup({
        password: new FormControl('', Validators.compose([
          CustomValidators.validPassword
        ])),
        confirm_password: new FormControl('', Validators.compose([
          Validators.required
        ]))},
        (formGroup: FormGroup) => {
          return CustomValidators.areEqual(formGroup);
        }        
      ),
      terms: new FormControl('',null)

    });
  }

  //Reset the form
  resetForm() {
    this.myForm.reset();
  }
  
  ngOnInit() {
    this.createForm();
    //Reset password confirm if we modify password
    this.myForm.get("matching_passwords_group").get("password").valueChanges.subscribe(val=> {
      this.myForm.get("matching_passwords_group").get("confirm_password").reset();
    });
  }
  parentErrorStateMatcher = new ParentErrorStateMatcher();
//From submit
onSubmit(value) {
 
  if (this.myForm.valid) {
    console.log("Valid form!");
  } else {
    console.log("Invalid form!");
  }
 }
}