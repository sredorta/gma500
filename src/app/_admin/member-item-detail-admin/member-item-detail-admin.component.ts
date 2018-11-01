import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {User} from '../../_models/user';
import {Role} from '../../_models/role';
import {Group} from '../../_models/group';

@Component({
  selector: 'app-member-item-detail-admin',
  templateUrl: './member-item-detail-admin.component.html',
  styleUrls: ['./member-item-detail-admin.component.scss']
})
export class MemberItemDetailAdminComponent implements OnInit {
  //Inputs
  @Input() member: User;
  @Input() roles : Role[] = new Array<Role>();
  @Input() groups : Group[] = new Array<Group>();
  @Input() accounts: Array<string> = new Array<string>();
  @Output() action = new EventEmitter<any>();

  constructor() { 

  }

  ngOnInit() {
  }

  //Return if member has a certain role id
  hasRole(id:number) {
    let result = this.member.roles.find(i => i.id == id);
    if (result == undefined) return false;
    return true;
  }
  //Returns if member has a group
  hasGroup(id:number) {
    let result = this.member.groups.find(i => i.id == id);
    if (result == undefined) return false;
    return true;
  }
  //Returns if member has account
  hasAccount(access:string) {
    let result = this.member.accounts.find(i => i.access == access);
    if (result == undefined) return false;
    return true;
  }

  //Emit outputs
  private _removeRole(role:number) {
    this.action.emit({action:"removeRole", role:role, id:this.member.id});
  }

  private _addRole(role:number) {
    this.action.emit({action:"addRole", role:role, id:this.member.id});
  }

  private _removeAccount(account:string) {
    this.action.emit({action:"removeAccount", account:account, id:this.member.id});
  }

  private _addAccount(account:string) {
    this.action.emit({action:"addAccount", account:account, id:this.member.id});
  }

  private _removeGroup(group:number) {
    this.action.emit({action:"removeGroup", group:group, id:this.member.id});
  }
  private _addGroup(group:number) {
    this.action.emit({action:"addGroup", group:group, id:this.member.id});
  }  

}
