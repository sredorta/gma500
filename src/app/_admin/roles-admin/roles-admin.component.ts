import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MakeSureDialogComponent} from '../../_library/make-sure-dialog/make-sure-dialog.component';

//Import all shared logic required for forms handling
import {CustomValidators  } from '../../_helpers/custom.validators';
import {Role} from "../../_models/role";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-roles-admin',
  templateUrl: './roles-admin.component.html',
  styleUrls: ['./roles-admin.component.scss']
})
export class RolesAdminComponent implements OnInit {
  roles : Role[] = new Array<Role>();     //Available roles
  myForm: FormGroup; 
  loading = false;

  //Get error messages
  validation_messages = CustomValidators.getMessages();
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private adminService:AdminService, public dialog: MatDialog) { }

  //Update html
  ngOnChanges(changes: SimpleChanges) {
    this.roles = changes.roles.currentValue;
  }

  ngOnInit() {
    this.createForm();
    //Download all available roles
    this._subscriptions.push(this.adminService.getRoles().subscribe((result) => {
      for(let role of result) {
          this.roles.push(new Role(role));
      }
      console.log(this.roles);
    }));    
  }

  //Create the form
  createForm() {
    this.myForm =  new FormGroup({    
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)        
      ])),
    });
  }
  //From submit
  onSubmit(value) {
    if (this.myForm.invalid) {
      return;
    }
    this.loading = true;
    this._subscriptions.push(this.adminService.createRole(value.name,value.description).subscribe(result=>{
      this.loading = false;
      this.roles.push(new Role(result));
    }, error => {
        this.loading = false;
    }));
    console.log(value);
  }
  reset() {
  }

  deleteRole(id:number) {
    this.loading = true;
    let dialogRef = this.dialog.open(MakeSureDialogComponent, {
      disableClose :true,
      data:  {title: "Suprimer un role",
              text:"Attention quand vous suprimez un role tous les utilizateurs avec ce role n'auront plus le role supprimé"
            } 
    });
    this._subscriptions.push(dialogRef.afterClosed().subscribe((result : boolean) => {
      if (result) {    
        this._subscriptions.push(this.adminService.deleteRole(id).subscribe(result=>{
          this.loading = false;
          let role = this.roles.find(i => i.id == id);
          let index = this.roles.indexOf(role);
          this.roles.splice(index,1);      
        }));    
        console.log("Delete role : " + id);
      } else {
        this.loading = false;
      }
    }));
  }
/*
  openUserRemoveDialog() {
    let dialogRef = this.dialog.open(MakeSureDialogComponent, {
      disableClose :true,
      data:  {title: "Suprimer votre compte",
              text:"Attention cette operation est irreversible, vous allez effacer tous vos messages, vos documents..."
            } 
    });
    this._subscriptions.push(dialogRef.afterClosed().subscribe((result : boolean) => {
      if (result) {
        this._subscriptions.push(this.userService.delete().subscribe(result => {
          this.userService.setCurrent(new User(null));
          User.removeToken();
          this.router.navigate([""]); //Go back home
        }));
      }
    }));
  }
*/




  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
