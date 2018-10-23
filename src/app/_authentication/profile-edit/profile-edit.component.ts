import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatAccordion, MatExpansionPanel} from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

//Import all shared logic required for forms handling
import {CustomValidators, ParentErrorStateMatcher  } from '../../_helpers/custom.validators';

//Dialogs
import {TermsDialogComponent} from '../../_dialogs/terms-dialog/terms-dialog.component'
//Directives
import { OnlyNumberDirective } from '../../_directives/onlyNumber.directive';
import { UserService } from '../../_services/user.service';

//User model
import {User} from '../../_models/user';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  //@Input() user : User;
  user: User = new User(null);

  loading = false;        //Tells html we are loading
  httpMsgVisible = false; //Tells html to show result message
  httpMsgType = "error";  //Error or success
  httpMsgText='';         //http error if any
  
  panels : MatExpansionPanel[] = new Array<MatExpansionPanel>();

  @ViewChild('expandedPanel0') firstExpansionPanel : MatExpansionPanel           //File input element  
  @ViewChild('expandedPanel1') lastExpansionPanel : MatExpansionPanel           //File input element  

  firstFG: FormGroup; 
  lastFG: FormGroup;


  //Get error messages
  validation_messages = CustomValidators.getMessages();
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  private _subscriptions : Subscription[] = new Array<Subscription>();


  constructor() {
    //This is temp to test
    this.user.firstName = "Test";
    this.user.lastName = "kiki";
   }
  createForms() {
    this.firstFG =  new FormGroup({    
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ]))
    });
    this.firstFG.get("firstName").setValue(this.user.firstName);

    this.lastFG =  new FormGroup({    
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ]))
    });
    this.lastFG.get("lastName").setValue(this.user.lastName);
  }
  ngOnInit() {
    this.createForms();
  }

  //Reset the form
  resetFormFirst() {
    this.firstExpansionPanel.close();
    this.firstFG.get("firstName").setValue(this.user.firstName);
    this.httpMsgVisible = false;
  }

 //Reset the form
 resetFormLast() {
  this.lastExpansionPanel.close();
  this.lastFG.get("lastName").setValue(this.user.lastName);
  this.httpMsgVisible = false;
}  

 //From submit
 onSubmit(value) {
  console.log("onSubmit");
  console.log(value); 
  //Handle invalid form
/*  if (this.myForm.invalid) {
    return;*/
    //Submit http...
  }



}
