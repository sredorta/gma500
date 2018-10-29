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
  boards : User[] = new Array<User>();
  bureaus : User[] = new Array<User>();
  members : User[] = new Array<User>();


  memberCount :number;
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private userService:UserService) {}

  ngOnInit() {
    this.userService.isLogged().subscribe(res=> this.isLogged = res);
    //Load board
    this._subscriptions.push(this.userService.getUsersByType("board").subscribe((result) => {
        for (let i of result) {
          this.boards.push(new User(null));
        }
        let i = 0;
        for(let id of result) {
          console.log("Adding id: " + id);
          this._subscriptions.push(this.userService.getUserById(id).subscribe(res => {
            console.log("Resulting user:"); console.log(res)
            this.boards[i] = new User(res);
            i++;
          }));
        }
    }));
    //Load Bureau
    this._subscriptions.push(this.userService.getUsersByType("bureau").subscribe((result) => {
      for (let i of result) {
        this.bureaus.push(new User(null));
      }
      //console.log(result);
      let j = 0;
      for(let id of result) {
        //console.log("Adding id: " + id);
        this._subscriptions.push(this.userService.getUserById(id).subscribe(res => {
          //console.log("Resulting user:"); console.log(res)
          this.bureaus[j] = new User(res);
          j++;
        }));
      }
    }));
/*
    //Load Members
    //Limit the number of members download to 10    
    this._subscriptions.push(this.userService.getUsersByType("member").subscribe((result) => {
      this.memberCount = result.length;
      for (let i of result) {
        this.members.push(new User(null));
      }
      let k = 0;
      for(let id of result) {
        this._subscriptions.push(this.userService.getUserById(id).subscribe(res => {
          this.members[k] = new User(res);
          k++;
        }));
      }
    }));
*/

  }
/*
  onScroll($event) {
    console.log($event.target.offsetWidth + $event.target.scrollLeft);
    console.log($event.target.scrollWidth);
    //Detect end of scroll
    if($event.target.offsetWidth + $event.target.scrollLeft >= ($event.target.scrollWidth-1)) {
        console.log("End");
        console.log(this._nextMember);
        console.log(this._members.length);
        //this.members.push(new User(null));
          this._subscriptions.push(this.userService.getUserById(this._members[this._nextMember]).subscribe(res => {
            this.members.push(new User(res));
          }));
        this._nextMember++;
    }
  }
*/
  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

}
