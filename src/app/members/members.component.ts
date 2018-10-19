import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router} from '@angular/router';
import {User} from "../_models/user";
import { Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
        for(let id of result) {
          this.boards$.push(this.userService.getUserById(id));
          this.userService.getUserById(id).subscribe(res => console.log(res));
        }
        Observable.concat(this.boards$); //Serialize http requests
        this.boardsReady = true;
    });
    //Load bureaus    
      this.userService.getUsersByType("bureau").subscribe((result) => {
        for(let id of result) {
          this.bureaus$.push(this.userService.getUserById(id));
        }
        Observable.concat(this.bureaus$); //Serialize http requests
        this.bureausReady = true;
      });      
      this.userService.getUsersByType("member").subscribe((result) => {
        this.memberCount = result.length;
        var size = 10;
        result = result.slice(0, size);
        for (let id of result) {
          this.members$.push(this.userService.getUserById(id));
        }
        Observable.concat(this.members$); //Serialize http requests
        this.membersReady = true;        
      });

  }


}
