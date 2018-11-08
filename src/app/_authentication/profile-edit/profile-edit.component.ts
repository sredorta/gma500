import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatAccordion, MatExpansionPanel, MAT_ACCORDION} from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

//Import all shared logic required for forms handling
import {CustomValidators, ParentErrorStateMatcher  } from '../../_helpers/custom.validators';

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
  @Input() user : User;
  //user: User = new User(null);
  avatar : string = './assets/img/user-default.jpg';
  loading = false;        //Tells html we are loading
  
  panels : MatExpansionPanel[] = new Array<MatExpansionPanel>();

  //@ViewChild('expandedPanel0') firstExpansionPanel : MatExpansionPanel           //File input element  
  //@ViewChild('expandedPanel1') lastExpansionPanel : MatExpansionPanel           //File input element  
  //@ViewChild('accordeonUpdate') updateAccordeon : MatAccordion;
  firstFG: FormGroup; 
  lastFG: FormGroup;
  emailFG: FormGroup;
  avatarFG: FormGroup;
  mobileFG: FormGroup;
  passFG: FormGroup;

  myCurrentUser : User = new User(null);

  //Get error messages
  validation_messages = CustomValidators.getMessages();
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  private _subscriptions : Subscription[] = new Array<Subscription>();


  constructor(private userService : UserService) {}

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

    this.avatarFG = new FormGroup({dummy: new FormControl()});

    this.emailFG =  new FormGroup({    
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))
    });
    this.emailFG.get("email").setValue(this.user.email);

    this.mobileFG =  new FormGroup({    
      mobile: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),       
        CustomValidators.validMobile
      ]))
    });
    this.mobileFG.get("mobile").setValue(this.user.mobile);    

    this.passFG =  new FormGroup({    
      password_old: new FormControl('', Validators.compose([
        CustomValidators.validPassword
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
      )}); 

  }
  ngOnInit() {
    this.createForms();
    this._subscriptions.push(this.userService.getCurrent().subscribe(result => {
      this.myCurrentUser = result;
    }));
  }

  //Reset the form
  resetForm(f:any) {
    //this.updateAccordeon.displayMode().closeAll();
    //this.firstExpansionPanel.close();
  }
 
  //Update photo if we change it
  onImageChange(photo:string) {
    this.avatar = photo;
  }

 //From submit
 onSubmit(value, form : FormGroup) {
   //Handle invalid form
   if (form.invalid) {
    return;
  }

  //Valid form part
  this.loading = true;
  let myUpdateUser = new User(null);
  if (value.firstName != null) myUpdateUser.firstName = value.firstName;
  if (value.lastName != null) myUpdateUser.lastName = value.lastName;
  if (value.email != null) myUpdateUser.email = value.email;
  if (value.mobile != null) myUpdateUser.mobile = value.mobile;
  if (value.avatar != null) myUpdateUser.avatar = 'url(' + value.avatar + ')';
  if (value.password_old != null) {
    myUpdateUser.password = value.matching_passwords_group.password; //New password
  }
  //if (value.avatar != null) myUpdateUser.password = value.password;
  this._subscriptions.push(this.userService.update(myUpdateUser, value.password_old).subscribe(
      (result: any) => {
        if (value.firstName != null) this.myCurrentUser.firstName = value.firstName;
        if (value.lastName != null) this.myCurrentUser.lastName = value.lastName;
        if (value.email != null) this.myCurrentUser.email = value.email;
        if (value.mobile != null) this.myCurrentUser.mobile = value.mobile;
        if (value.avatar != null) this.myCurrentUser.avatar = 'url(' + value.avatar + ')';
        this.userService.setCurrent(this.myCurrentUser);
        this.loading = false;
        //this.router.navigate([""]);                 
      },
      error => {
          this.loading = false;
      })); 

  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

}
