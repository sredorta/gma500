import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AdminService } from '../../_services/admin.service';
import {AdminProductCreateComponent} from '../admin-product-create/admin-product-create.component';
import { Router} from '@angular/router';
import {User} from "../../_models/user";
import {Role} from "../../_models/role";
import {Group} from "../../_models/group";

import { Subscription } from 'rxjs';
import { Account } from '../../_models/account';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminMembersComponent implements OnInit {
  dataSource = null;            //Store members in table format
  usersDisplayed : number = 0;  //Users displayed with filter
  usersCount :number = 0;       //Users total
  displayedColumns: string[] = ['avatar','lastName','firstName', "created"];
  @ViewChild('myTable') table : MatTable<any>;           //MatTable for rendering 

  roles : Role[] = new Array<Role>();     //Available roles
  groups : Group[] = new Array<Group>();  //Available groups
  accounts : string[] = ["Pré-inscrit", "Membre", "Admin"];
  loading : boolean = false;
  loadingTable : boolean = true;

  
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private adminService:AdminService,private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    //Download all users with roles and accounts
    this._subscriptions.push(this.adminService.getUsers().subscribe((result) => {
      let users = new Array<User>();
      for(let user of result) {
          users.push(new User(user));
      }
      this.dataSource = new MatTableDataSource(users);
      //Override filter to look only at first and last name
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
          let hasGroup,hasRole,hasAccess :boolean = false;
          if (filter.length>3) {
            hasGroup = JSON.stringify(data.groups).toLowerCase().includes(filter);
            hasRole =  JSON.stringify(data.roles).toLowerCase().includes(filter);
            hasAccess =  JSON.stringify(data.accounts).toLowerCase().includes(filter);
          } 
          return data.firstName.toLowerCase().includes(filter) || 
                 data.lastName.toLowerCase().includes(filter) || hasRole || hasGroup || hasAccess;
      };
      this.usersCount = this.dataSource.data.length;
      this.usersDisplayed = this.dataSource.data.length;

      this.loadingTable = false;
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
  //Filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.usersDisplayed = this.dataSource.filteredData.length;
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
      case "toggleAccount":
        this._toggleAccount(event.id);
        break;  
      case "addGroup":
        this._addGroup(event.id, event.group);
        break;
      case "removeGroup":
        this._removeGroup(event.id, event.group);
        break;
      case "removeUser":
        this._removeUser(event.id);  
        break;
      default:
        console.log("undefined action !");  
    }
  }

  private _removeUser(id:number) {
    this.loading = true;
    this._subscriptions.push(this.adminService.deleteUser(id).subscribe(res => {
      const itemIndex = this.dataSource.data.findIndex(obj => obj.id === id);
      this.dataSource.data.splice(itemIndex, 1); 
      const itemIndexFilter = this.dataSource.filteredData.findIndex(obj => obj.id === id);
      if (itemIndexFilter>=0) {
        this.dataSource.filteredData.splice(itemIndexFilter, 1); 
      }
      this.table.renderRows();
      this.usersCount = this.dataSource.data.length;
      this.usersDisplayed = this.dataSource.filteredData.length;   
      this.loading = false;
    }));

  }

  //Adds a role to a user
  private _addRole(user_id:number, role_id:number) {
    this.loading = true;
    this._subscriptions.push(this.adminService.addRoleToUser(user_id,role_id).subscribe(() => {
      let newRole = this.roles.find(i => i.id == role_id);
      let user = this.dataSource.data.find(i=> i.id == user_id);
      user.roles.push(newRole);
      this.loading = false;
    }));
  }

  //Removes a role from a user
  private _removeRole(user_id:number, role_id:number) {
    this.loading = true;
    this._subscriptions.push(this.adminService.removeRoleToUser(user_id,role_id).subscribe(() => {
      let user = this.dataSource.data.find(i=> i.id == user_id);
      let newRole = this.roles.find(i => i.id == role_id);
      let index = user.roles.indexOf(newRole);
      user.roles.splice(index,1);      
      this.loading = false;
    }));
  }

  private _addGroup(user_id:number, group_id:number) {
    this.loading = true;
    this._subscriptions.push(this.adminService.addGroupToUser(user_id,group_id).subscribe(() => {
      let newGroup = this.groups.find(i => i.id == group_id);
      let user = this.dataSource.data.find(i=> i.id == user_id);
      user.groups.push(newGroup);
      this.loading = false;
    }));
  }

  private _removeGroup(user_id:number, group_id:number) {
    this.loading = true;
    this._subscriptions.push(this.adminService.removeGroupToUser(user_id,group_id).subscribe(() => {
      let user = this.dataSource.data.find(i=> i.id == user_id);
      let newGroup = this.groups.find(i => i.id == group_id);
      let index = user.groups.indexOf(newGroup);
      user.groups.splice(index,1);      
      this.loading = false;      
    }));
  }

  
  private _addAccount(user_id:number, access:string) {
    this.loading = true;
    this._subscriptions.push(this.adminService.addAccountToUser(user_id,access).subscribe((result:Account)=> {
      let account = new Account(result);
      let user = this.dataSource.data.find(i=> i.id == user_id);
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
      let user = this.dataSource.data.find(i=> i.id == user_id);
      let index = user.accounts.indexOf(user.accounts.find(i=> i.access == access));
      user.accounts.splice(index,1);
      this.loading = false;
    }));

  }

  private _toggleAccount(user_id:number) {
    this.loading = true;
    this._subscriptions.push(this.adminService.toggleAccountMember(user_id).subscribe(() => {
      let user = this.dataSource.data.find(i=> i.id == user_id);
      let index = user.accounts.indexOf(user.accounts.find(i=> i.access == "Membre"));
      if (index>=0) {
        user.accounts[index].access = 'Pré-inscrit';
      } else {
        let index = user.accounts.indexOf(user.accounts.find(i=> i.access == "Pré-inscrit"));
        user.accounts[index].access = 'Membre';
      } 
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
