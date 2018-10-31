import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {User} from '../../_models/user';
import {Role} from '../../_models/role';

@Component({
  selector: 'app-member-item-detail-admin',
  templateUrl: './member-item-detail-admin.component.html',
  styleUrls: ['./member-item-detail-admin.component.scss']
})
export class MemberItemDetailAdminComponent implements OnInit {
  //Inputs
  @Input() member: User;
  @Input() roles : Role[] = new Array<Role>();
  @Input() accounts: Array<string> = new Array<string>();
  @Output() actionRole = new EventEmitter<any>();
  @Output() actionAccount = new EventEmitter<any>();

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
  hasAccount(access:string) {
    let result = this.member.accounts.find(i => i.access == access);
    if (result == undefined) return false;
    return true;
  }

  //Emit outputs
  private _removeRole(role:number) {
    this.actionRole.emit({action:"remove", role:role, id:this.member.id});
  }

  private _addRole(role:number) {
    this.actionRole.emit({action:"add", role:role, id:this.member.id});
  }

  private _removeAccount(account:string) {
    this.actionAccount.emit({action:"remove", account:account, id:this.member.id});
  }

  private _addAccount(account:string) {
    this.actionAccount.emit({action:"add", account:account, id:this.member.id});
  }

}
