import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {User} from '../../_models/user';


@Component({
  selector: 'app-member-item-admin',
  templateUrl: './member-item-admin.component.html',
  styleUrls: ['./member-item-admin.component.scss']
})
export class MemberItemAdminComponent implements OnInit {
  //Inputs
  @Input() member: User;
  @Output() selected = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  private _select() {
    this.selected.emit(this.member);;
  }
}
