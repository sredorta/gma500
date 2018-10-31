import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { Router} from '@angular/router';
import {User} from "../../_models/user";
import {Role} from "../../_models/role";

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss']
})
export class AdminMembersComponent implements OnInit {
  users : User[] = new Array<User>();
  roles : Role[] = new Array<Role>();
  userSelected : User = new User(null);
  usersCount :number;
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private adminService:AdminService) { }

  ngOnInit() {
    //Download all users with roles and accounts
    this._subscriptions.push(this.adminService.getUsers().subscribe((result) => {
      for(let user of result) {
          this.users.push(new User(user));
      }
    }));  
    //Download all users with roles and accounts
    this._subscriptions.push(this.adminService.getRoles().subscribe((result) => {
      for(let role of result) {
          this.roles.push(new Role(role));
      }
      console.log(this.roles);
    }));     
  }

  updateSelected($event) {
    this.userSelected = $event;
    console.log("Update selected");
    console.log($event);
  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
