import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges,ElementRef, ViewChild, HostListener } from '@angular/core';
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
  @Input() loading: boolean = false; 
  @Output() action = new EventEmitter<any>();


  constructor() { 
  }

  //Update html
  ngOnChanges(changes: SimpleChanges) {
    //this.loading = changes.loading.currentValue;
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
  _deleteUser(id) {
    if (!this.loading) {
      this.action.emit({action:"removeUser", id:this.member.id});
    }       
  }
  _toggleMember(event) {
    if (!this.loading) {
      this.action.emit({action:"toggleAccount", id:this.member.id});
    }    
  }

  _toggleAdmin(event) {
    if (!this.loading) {
      if (event.checked)  this.action.emit({action:"addAccount", account:'Admin', id:this.member.id});
      else this.action.emit({action:"removeAccount", account:'Admin', id:this.member.id});
    }
  }  
  _removeRole(role:number) {
    if (!this.loading)
    this.action.emit({action:"removeRole", role:role, id:this.member.id});
  }

  _addRole(role:number) {
    if (!this.loading)
    this.action.emit({action:"addRole", role:role, id:this.member.id});
  }

  _removeGroup(group:number) {
    if (!this.loading)
    this.action.emit({action:"removeGroup", group:group, id:this.member.id});
  }
  _addGroup(group:number) {
    if (!this.loading)
    this.action.emit({action:"addGroup", group:group, id:this.member.id});
  }  

}
