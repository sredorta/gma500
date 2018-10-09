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
  user  = this.httpService.getUser();   //User data that is globally stored and sync
  boards : User[] = [];
  boardsReady :boolean = false;
  members: User[] = [];
  membersReady: boolean = false;
  bureau : User[] = [];
  bureauReady : boolean = false;
  memberCount :number;

  constructor(private httpService:HttpService) {}

  ngOnInit() {
    //Load board and president
    this.httpService.getPresident().subscribe((result:User[]) => {
      this.boards.push(result[0]);
      //Load board
      this.httpService.getBoard().subscribe((result:User[]) => {
        for(let res of result) {
          this.boards.push(res);
        }
        this.boardsReady = true;
      });
    });    


    //Load bureau elements
    this.httpService.getBureau().subscribe((result:User[]) => {
        this.bureau = result;
        this.bureauReady = true;
    });

    //Load member elements
    this.httpService.getMembers().subscribe((result:User[]) => {
      this.members = result;
      this.membersReady = true;
      this.memberCount = this.members.length;
    });    

  }

}
