import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router} from '@angular/router';
import {User} from "../_models/user";
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  myUser  = this.httpService.getUser();   //User data that is globally stored and sync
  presidents = this.httpService.getPresident();
  boards=this.httpService.getBoard();
  bureaus=this.httpService.getBureau();
  members=this.httpService.getMembers();
  memberCount :number;

  constructor(private httpService:HttpService) {}

  ngOnInit() {

    this.httpService.getMembers().subscribe(res=> this.memberCount = res.length);
    this.myUser.subscribe(res=>{
      console.log("myUser:");
      console.log(res);
    });

  }

}
