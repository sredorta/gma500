import { Component, OnInit, Input } from '@angular/core';
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
  @Input() roles : Role;

  constructor() { }

  ngOnInit() {
  }
  //Return if member has a certain role id
  hasRole(id:number) {
    console.log("Finding role id: " + id);
    let result = this.member.roles.find(i => i.id == id);
    if (result == undefined) return false;
    console.log("Returning true");
    return true;
  }

}
