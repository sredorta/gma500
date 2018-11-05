import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
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

  constructor(private adminService:AdminService) { }

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
    this._subscriptions.push(this.adminService.deleteRole(id).subscribe(result=>{
      this.loading = false;
      let role = this.roles.find(i => i.id == id);
      let index = this.roles.indexOf(role);
      this.roles.splice(index,1);      
    }));    
    console.log("Delete role : " + id);
  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
