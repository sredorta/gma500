import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { Router} from '@angular/router';
import {User} from "../../_models/user";
import {Role} from "../../_models/role";
import {Group} from "../../_models/group";

import { Subscription } from 'rxjs';
import { Account } from '../../_models/account';

@Component({
  selector: 'app-roles-admin',
  templateUrl: './roles-admin.component.html',
  styleUrls: ['./roles-admin.component.scss']
})
export class RolesAdminComponent implements OnInit {
  roles : Role[] = new Array<Role>();     //Available roles
  private _subscriptions : Subscription[] = new Array<Subscription>();
  constructor(private adminService:AdminService) { }

  ngOnInit() {
    //Download all available roles
    this._subscriptions.push(this.adminService.getRoles().subscribe((result) => {
      for(let role of result) {
          this.roles.push(new Role(role));
      }
      console.log(this.roles);
    }));    
  }

  deleteRole(id:number) {
    console.log("Delete role : " + id);
  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
