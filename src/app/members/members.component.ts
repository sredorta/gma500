import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router} from '@angular/router';
import {User} from "../_models/user";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  user  = this.httpService.getUser();   //User data that is globally stored and sync


  presidents = this.httpService.getMembers("president");//: Observable<User[]>;
  boards = this.httpService.getMembers("board");

  bureaus = this.httpService.getMembers("bureau");
  members = this.httpService.getMembers("member");



  constructor(private httpService:HttpService) {}

  ngOnInit() {
    this.httpService.getMembers("president").subscribe(res=>{console.log("Got presidents:");console.log(res)});
    //this.presidents = 
    /*.subscribe((res:User[])=> {
      console.log("President :");
      console.log(res);
      this.president = res[0];
      this.president.firstName = "test";
      this.president.lastName = "test";
      console.log(this.president);
    });*/
/*    this.httpService.getMembers("board").subscribe(res => {
      this.board = res;
      console.log(this.board);
    });
    this.httpService.getMembers("bureau").subscribe(res => {
      this.bureau = res;
      console.log(this.bureau);
    });    */

  }

}
