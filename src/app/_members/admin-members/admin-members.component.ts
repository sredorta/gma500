import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { Router} from '@angular/router';
import {User} from "../../_models/user";
import {Role} from "../../_models/role";

import { Subscription } from 'rxjs';
import { Account } from '../../_models/account';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss']
})
export class AdminMembersComponent implements OnInit {
  users : User[] = new Array<User>();
  roles : Role[] = new Array<Role>();
  accounts : string[] = ["Pré-inscrit", "Membre", "Admin"];
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

  //Handle Role actions
  roleActionHandler(event) {
    if (event.action == "add") {
      //TODO:: Do the adminService first
      let newRole = this.roles.find(i => i.id == event.role);
      let user = this.users.find(i => i.id == event.id);
      user.roles.push(newRole);
    }
    if (event.action == "remove") {
      //TODO:: DO admin service
      let newRole = this.roles.find(i => i.id == event.role);
      let user = this.users.find(i => i.id == event.id);
      let index = user.roles.indexOf(newRole);
      user.roles.splice(index,1);
    }
  }

  //Handle Account actions
  accountActionHandler(event) {
    if (event.action == "add") {
      //TODO:: Do the adminService first and get the new account data and push account
      let myAccount = new Account({id:1000,profile_id:event.id,access:event.account})

      let user = this.users.find(i => i.id == event.id);
      user.accounts.push(myAccount);    
    }
    if (event.action == "remove") {
      let user = this.users.find(i => i.id == event.id);
      let index = user.accounts.indexOf(user.accounts.find(i=> i.access == event.account));
      user.accounts.splice(index,1);
    }
  } 

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
