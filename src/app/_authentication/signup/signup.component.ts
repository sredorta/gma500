import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//Import all shared logic required for forms handling
import {CustomValidators, ParentErrorStateMatcher  } from '../../_helpers/custom.validators';

//Dialogs
import {TermsDialogComponent} from '../../_dialogs/terms-dialog/terms-dialog.component'
//Directives
import { OnlyNumberDirective } from '../../_directives/onlyNumber.directive';
import { HttpService } from '../../_services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup; 
  //Get error messages
  validation_messages = CustomValidators.getMessages();

  loading = false;        //Tells html we are loading
  httpMsgVisible = false; //Tells html to show result message
  httpMsgType = "error";  //Error or success
  httpMsgText='';         //http error if any
  avatar : string = "./assets/img/user-default.jpg";
  terms : boolean = false; //Terms and conditions checkbox

  constructor(private httpService: HttpService, private router: Router,public dialog: MatDialog) { }
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
    this.httpMsgVisible = false;
  }
  
  ngOnInit() {
    this.createForm();
    //Reset password confirm if we modify password
    this.myForm.get("matching_passwords_group").get("password").valueChanges.subscribe(val=> {
      this.myForm.get("matching_passwords_group").get("confirm_password").reset();
    });
  }
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  //Update photo if we change it
  onImageChange(photo:string) {
    this.avatar = photo;
  }

  //Update terms when changing value
  onTermsChange(event:any) {
    this.terms = event.checked;
  }

  //From submit
  onSubmit(value) {

    //Handle invalid form
    if (this.myForm.invalid) {
      return;
    }

    //Handle terms
    if (!this.terms) {
      this.httpMsgVisible = true;
      this.httpMsgType = "error";
      this.httpMsgText = "Vous dévez accepter les conditions d'utilization des données"
      return;
    }

    //Valid form part
    this.httpMsgVisible = false;
    this.loading = true;
    this.httpService.userSignup(value.firstName, value.lastName, value.email, value.mobile, value.matching_passwords_group.password, this.avatar).subscribe(
        data => {
            console.log(data);
            console.log("End of http service success !!!");
            this.httpMsgVisible = false;

            this.loading = false; //tmp
            //Redirect to home
            //this.router.navigate(['']);     ///////////////////////////         
        },
        error => {
            this.httpMsgVisible = true;
            this.httpMsgType = "error";
            this.httpMsgText = error;
            this.loading = false;
        });
    }  

    //Terms and conditions dialog
    openTermsAndConditionsDialog(): void {
      let dialogRef = this.dialog.open(TermsDialogComponent, {
        panelClass: 'big-dialog',
        width: '80%',
        height: '80%',
        data:  null 
      });
    }
}