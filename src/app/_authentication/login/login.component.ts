import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
//Import all shared logic required for forms handling
import {CustomValidators  } from '../../_helpers/custom.validators';
import {HttpService } from '../../_services/http.service';


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

  constructor(private httpService: HttpService,private router : Router) { }
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
  this.httpService.userLogin(value.email,value.password).subscribe(
      data => {
          console.log(data);
          //Here we need to store user in sessionStorage and then move to home again
          
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
