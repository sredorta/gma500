import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router} from '@angular/router';
import {User} from "../_models/user";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  user  = this.httpService.getUser();   //User data that is globally stored and sync

  president : any;
  board : any[];
  bureau : any[];
  members: any[];



  constructor(private httpService:HttpService) {}

  ngOnInit() {

    this.httpService.getMembers("president").subscribe(res=> {
      this.president = res[0];
      console.log(this.president);
    });
    this.httpService.getMembers("board").subscribe(res => {
      this.board = res;
      console.log(this.board);
    });
    this.httpService.getMembers("bureau").subscribe(res => {
      this.bureau = res;
      console.log(this.bureau);
    });    

  }

}
