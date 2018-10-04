import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { Location } from '@angular/common';
import {  FormGroup,FormControl,Validators } from '@angular/forms';
//Import all shared logic required for forms handling
import {CustomValidators  } from '../../_helpers/custom.validators';
import { HttpService } from '../../_services/http.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  myForm: FormGroup;
  //Get error messages
  validation_messages = CustomValidators.getMessages();
  loading = false;    //Tells html we are loading
  httpMsgVisible = false; //Tells html to show result message
  httpMsgType = "error";  //Error or success
  httpMsgText='';         //http error if any

  constructor(private _location: Location, private httpService : HttpService) { }

  ngOnInit() {
    this.myForm = this.createForm(); 
  }

  createForm() {
    return new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))
    });
  }
  resetForm() {
    //this.myForm.reset();
  }
  //From submit
  onSubmit(value) {
    if (this.myForm.invalid) {
      return;
    }
    this.httpMsgVisible = false;
    this.loading = true;
    //request http here !
    this.httpService.userResetPassword(value.email).subscribe(
        data => {
            console.log(data);
            console.log("End of http service success !!!");
            this.httpMsgVisible = true;
            this.httpMsgType = "success";
            this.httpMsgText = "Nouveau mot de passe envoyé par email";
            this.loading = false;
            this.resetForm();
        },
        error => {
            this.httpMsgVisible = true;
            this.httpMsgType = "error";
            this.httpMsgText = error;
            this.loading = false;
        });
    }  




  //Go back if we cancel
  goBack() {
    this._location.back(); 
  }
}
