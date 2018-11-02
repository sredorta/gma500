import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { Router} from '@angular/router';
import {User} from "../../_models/user";
import {Role} from "../../_models/role";
import {Group} from "../../_models/group";

import { Subscription } from 'rxjs';
import { Account } from '../../_models/account';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss']
})
export class AdminMembersComponent implements OnInit {
  users : User[] = new Array<User>();     //All users with roles, groups...
  roles : Role[] = new Array<Role>();     //Available roles
  groups : Group[] = new Array<Group>();  //Available groups
  accounts : string[] = ["Pré-inscrit", "Membre", "Admin"];
  loading : boolean = false;
  userSelected : User = new User(null);
  usersCount :number;
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private adminService:AdminService) { }

  ngOnInit() {
    //Download all users with roles and accounts
    this.loading = true;
    this._subscriptions.push(this.adminService.getUsers().subscribe((result) => {
      for(let user of result) {
          this.users.push(new User(user));
      }
      this.loading = false;
    }));  
    //Download all available roles
    this._subscriptions.push(this.adminService.getRoles().subscribe((result) => {
      for(let role of result) {
          this.roles.push(new Role(role));
      }
    }));
    //Download all available groups
    this._subscriptions.push(this.adminService.getGroups().subscribe((result) => {
      for(let group of result) {
          this.groups.push(new Group(group));
      }
    }));    

  }

  updateSelected($event) {
    this.userSelected = $event;
    console.log("Update selected");
    console.log($event);
  }

  //Handle actions
  actionHandler(event) {
    switch(event.action) {
      case "addRole":
        this._addRole(event.id, event.role);
        break;
      case "removeRole":
        this._removeRole(event.id, event.role);
        break;
      case "addAccount":
        this._addAccount(event.id, event.account);
        break;
      case "removeAccount":
        this._removeAccount(event.id, event.account);
        break;
      case "addGroup":
        this._addGroup(event.id, event.group);
        break;
      case "removeGroup":
        this._removeGroup(event.id, event.group);
        break;
      default:
        console.log("undefined action !");  
    }
  }

  //Adds a role to a user
  private _addRole(user_id:number, role_id:number) {
    this.loading = true;
    this._subscriptions.push(this.adminService.addRoleToUser(user_id,role_id).subscribe(() => {
      this.loading = false;
    }));
    let newRole = this.roles.find(i => i.id == role_id);
    let user = this.users.find(i => i.id == user_id);
    user.roles.push(newRole);
  }

  //Removes a role from a user
  private _removeRole(user_id:number, role_id:number) {
    this.loading = true;
    this._subscriptions.push(this.adminService.removeRoleToUser(user_id,role_id).subscribe(() => {
      this.loading = false;
    }));
    let newRole = this.roles.find(i => i.id == role_id);
    let user = this.users.find(i => i.id == user_id);
    let index = user.roles.indexOf(newRole);
    user.roles.splice(index,1);
  }

  private _addAccount(user_id:number, access:string) {
    this.loading = true;
    this._subscriptions.push(this.adminService.addAccountToUser(user_id,access).subscribe((result:Account)=> {
      let account = new Account(result);
      let user = this.users.find(i => i.id == user_id);
      user.accounts.push(account);    
      this.loading = false;
    },
    () => {
      this.loading = false;
    }));


  }
  private _removeAccount(user_id:number, access:string) {
    this.loading = true;
    this._subscriptions.push(this.adminService.removeAccountToUser(user_id,access).subscribe(() => {
      this.loading = false;
    }));
    let user = this.users.find(i => i.id == user_id);
    let index = user.accounts.indexOf(user.accounts.find(i=> i.access == access));
    user.accounts.splice(index,1);
  }


  private _addGroup(user_id:number, group_id:number) {
    this.loading = true;
    this._subscriptions.push(this.adminService.addGroupToUser(user_id,group_id).subscribe(() => {
      this.loading = false;
    }));
    let newGroup = this.groups.find(i => i.id == group_id);
    let user = this.users.find(i => i.id == user_id);
    user.groups.push(newGroup);
  }

  private _removeGroup(user_id:number, group_id:number) {
    this.loading = true;
    this._subscriptions.push(this.adminService.removeGroupToUser(user_id,group_id).subscribe(() => {
      this.loading = false;
    }));
    let newGroup = this.groups.find(i => i.id == group_id);
    let user = this.users.find(i => i.id == user_id);
    let index = user.groups.indexOf(newGroup);
    user.groups.splice(index,1);
  }


  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
