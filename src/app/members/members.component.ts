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
  isLogged: boolean = false;
  boards$ : Observable<User>[] = new Array;
  boardsReady :boolean = false;
  bureaus$ : Observable<User>[] = new Array;
  bureausReady :boolean = false;
  members$ : Observable<User>[] = new Array;
  membersReady :boolean = false;


  memberCount :number;

  constructor(private userService:UserService) {}

  ngOnInit() {
    this.userService.isLogged().subscribe(res=> this.isLogged = res);
    //Load board
    this.userService.getUsersByType("board").subscribe((result) => {
        for(let res of result) {
          this.boards$.push(this.userService.getUserById(res.id));
        }
        this.boardsReady = true;
    });
    //Load bureaus
    this.userService.getUsersByType("bureau").subscribe((result) => {
      for(let res of result) {
        this.bureaus$.push(this.userService.getUserById(res.id));
      }
      this.bureausReady = true;
  });
    //Load members
    this.userService.getUsersByType("member").subscribe((result) => {
      for(let res of result) {
        this.members$.push(this.userService.getUserById(res.id));
      }
      this.memberCount = this.members$.length;
      this.membersReady = true;
  });


/*
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
*/
  }

}
