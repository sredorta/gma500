import { Component, OnInit,Input } from '@angular/core';
import {HttpService} from '../../_services/http.service';
import {User} from '../../_models/user';


@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit {
  //Inputs
  @Input() member : User;           //Member to display
  @Input() isPresident : boolean;
  user  = this.httpService.getUser();   //User data that is globally stored and sync
  memberIsPresident : boolean = false;
  constructor(private httpService:HttpService) {

  }

  ngOnInit() {
    if (this.member.isPresident()) {
      this.memberIsPresident = true;
    }
  }

}
