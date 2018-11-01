import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { Router} from '@angular/router';
import {User} from "../../_models/user";
import {Role} from "../../_models/role";
import {Group} from "../../_models/group";

import { Subscription } from 'rxjs';
import { Account } from '../../_models/account';

@Component({
  selector: 'app-groups-admin',
  templateUrl: './groups-admin.component.html',
  styleUrls: ['./groups-admin.component.scss']
})
export class GroupsAdminComponent implements OnInit {
  groups : Group[] = new Array<Group>();  //Available groups
  private _subscriptions : Subscription[] = new Array<Subscription>();
  constructor(private adminService:AdminService) { }

  ngOnInit() {
    //Download all available groups
    this._subscriptions.push(this.adminService.getGroups().subscribe((result) => {
      for(let group of result) {
          this.groups.push(new Group(group));
      }
      console.log(this.groups);
    }));      
  }


  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
