import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

//Import all shared logic required for forms handling
import {CustomValidators, ParentErrorStateMatcher  } from '../../_helpers/custom.validators';

//Dialogs
import {TermsDialogComponent} from '../terms-dialog/terms-dialog.component'
//Directives
import { OnlyNumberDirective } from '../../_directives/onlyNumber.directive';
import { UserService } from '../../_services/user.service';

//User model
import {User} from '../../_models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  myForm: FormGroup; 
  //Get error messages
  validation_messages = CustomValidators.getMessages();

  highlight : boolean = false ; //Highlight terms and conditions

  loading = false;        //Tells html we are loading
  avatar : string = './assets/img/user-default.jpg';
  terms : boolean = false; //Terms and conditions checkbox
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private userService: UserService, private location : Location, private router : Router, public dialog: MatDialog) { }
  //Create the form
  createForm() {
    this.myForm =  new FormGroup({    
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
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
    this.highlight = false;
  }
  
  ngOnInit() {
    this.createForm();
    //Reset password confirm if we modify password
    this.myForm.get("matching_passwords_group").get("password").valueChanges.subscribe(val=> {
      this.myForm.get("matching_passwords_group").get("confirm_password").reset();
    });
  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
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
    this.highlight = false;
    //Handle invalid form
    if (this.myForm.invalid) {
      return;
    }

    //Handle terms
    if (!this.terms) {
      //TODO add something on terms !!!! to hightlight !!!!
      this.highlight = true;
      return;
    }

    //Valid form part
    this.loading = true;
    this._subscriptions.push(this.userService.signup(value.firstName, value.lastName, value.email, value.mobile, value.matching_passwords_group.password, this.avatar).subscribe(
        (result: any) => {
          console.log("We are here");
          console.log("result");
          this.loading = false;
          this.router.navigate([""]);                 
        },
        error => {
            this.loading = false;
        })); 
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