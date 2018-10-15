import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
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
  user$  = this.userService.getCurrent();   //User data that is globally stored and sync
  boards : User[] = [];
  boardsReady :boolean = false;
  members: User[] = [];
  membersReady: boolean = false;
  bureau : User[] = [];
  bureauReady : boolean = false;
  memberCount :number;

  constructor(private userService:UserService) {}

  ngOnInit() {
    //Load board and president
    this.userService.getPresident().subscribe((result:User[]) => {
      this.boards.push(result[0]);
      //Load board
      this.userService.getBoard().subscribe((result:User[]) => {
        for(let res of result) {
          this.boards.push(res);
        }
        this.boardsReady = true;
      });
    });    


    //Load bureau elements
    this.userService.getBureau().subscribe((result:User[]) => {
        this.bureau = result;
        this.bureauReady = true;
    });

    //Load member elements
    this.userService.getMembers().subscribe((result:User[]) => {
      this.members = result;
      this.membersReady = true;
      this.memberCount = this.members.length;
    });    

  }

}
