import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router} from '@angular/router';
import {User} from "../../_models/user";
import { Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Role } from '../../_models/role';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  user$  = this.userService.getCurrent();   //User data that is globally stored and sync
  boards : User[] = new Array<User>();
  bureaus : User[] = new Array<User>();
  membersAll : User[] = new Array<User>(); //Contains all members without filtering
  members : User[] = new Array<User>();    //Contains members with filtering
  membersRequested : boolean = false;

  memberCount :number;
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private userService:UserService) {}

  ngOnInit() {
    //Load board
    this._subscriptions.push(this.userService.getUsersByType("board").subscribe((result) => {
        for (let i of result) {
          this.boards.push(new User(null));
        }
        let i = 0;
        for(let id of result) {
          this._subscriptions.push(this.userService.getUserById(id).subscribe(res => {
            let user = new User(res);
            user.roles = user.roles.filter(i => i.name != "Bureau");
            this.boards[i] = user;
            i++;
          }));
        }
    }));
    //Load Bureau
    this._subscriptions.push(this.userService.getUsersByType("bureau").subscribe((result) => {
      for (let i of result) {
        this.bureaus.push(new User(null));
      }
      let j = 0;
      for(let id of result) {
        this._subscriptions.push(this.userService.getUserById(id).subscribe(res => {
          let user = new User(res);
          user.roles = user.roles.filter(i => i.name == "Bureau");
          this.bureaus[j] = user;
          j++;
        }));
      }
    }));
    this._subscriptions.push(this.userService.getUsersByType("member").subscribe((result) => {
      this.memberCount = result.length;
    }));
  }

  //Load Members
  loadAllMembers() {  
    this.membersRequested = true;
    this.members = new Array<User>(); //Reset memebers 
      this._subscriptions.push(this.userService.getMembers().subscribe(res => {
        console.log(res);
        for (let member of res) {
          let user = new User(member);
          user.roles.push(new Role({name:"Membre"}));
          this.members.push(user);
          this.membersAll.push(user);
        }
        this.membersRequested = false;
      })); 
  }
  applyFilter(filterValue: string) {
    this.members = this.membersAll.filter(i => {
      let name = i.firstName + ' ' + i.lastName;
      if (name.toLowerCase().search(filterValue.trim().toLowerCase())>=0) {
        return true;
      } 
    });
  }
  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

}
