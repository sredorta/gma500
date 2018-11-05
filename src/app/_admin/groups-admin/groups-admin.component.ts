import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MakeSureDialogComponent} from '../../_library/make-sure-dialog/make-sure-dialog.component';

//Import all shared logic required for forms handling
import {CustomValidators  } from '../../_helpers/custom.validators';
import {Group} from "../../_models/group";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-groups-admin',
  templateUrl: './groups-admin.component.html',
  styleUrls: ['./groups-admin.component.scss']
})
export class GroupsAdminComponent implements OnInit {
  groups : Group[] = new Array<Group>();     //Available roles
  myForm: FormGroup; 
  loading = false;

  //Get error messages
  validation_messages = CustomValidators.getMessages();
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private adminService:AdminService, public dialog: MatDialog) { }

  //Update html
  ngOnChanges(changes: SimpleChanges) {
    this.groups = changes.groups.currentValue;
  }

  ngOnInit() {
    this.createForm();
    //Download all available roles
    this._subscriptions.push(this.adminService.getGroups().subscribe((result) => {
      for(let group of result) {
          this.groups.push(new Group(group));
      }
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
    this._subscriptions.push(this.adminService.createGroup(value.name,value.description).subscribe(result=>{
      this.loading = false;
      this.groups.push(new Group(result));
    }, error => {
        this.loading = false;
    }));
  }
  reset() {

  }

  deleteGroup(id:number) { 
    this.loading = true;
    let dialogRef = this.dialog.open(MakeSureDialogComponent, {
      disableClose :true,
      data:  {title: "Suprimer un groupe",
              text:"Attention quand vous suprimez un groupe tous les utilizateurs avec ce groupe n'auront plus le groupe supprimé"
            } 
    });
    this._subscriptions.push(dialogRef.afterClosed().subscribe((result : boolean) => {
      if (result) {    
        this._subscriptions.push(this.adminService.deleteGroup(id).subscribe(result=>{
          this.loading = false;
          let group = this.groups.find(i => i.id == id);
          let index = this.groups.indexOf(group);
          this.groups.splice(index,1);      
        }));    
      } else {
        this.loading = false;
      }
    }));
  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}



