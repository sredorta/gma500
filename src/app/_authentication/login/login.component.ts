import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
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
  error='';

  constructor(private httpService: HttpService) { }
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
  if (this.myForm.invalid) {
    return;
  }
  this.loading = true;
  //request http here !
  this.httpService.userLogin(value.email,value.password).subscribe(
      data => {
          console.log(data);
          console.log("End of http service success !!!");
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }  

}
