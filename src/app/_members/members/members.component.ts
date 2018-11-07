import { Component, OnInit,SimpleChanges } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Location } from '@angular/common';
import { UserService } from '../../_services/user.service';
import {User} from "../../_models/user";
import { Observable, Subscription } from 'rxjs';
import { Role } from '../../_models/role';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],   
})
export class MembersComponent implements OnInit {
  user$  = this.userService.getCurrent();   //User data that is globally stored and sync
  boards : User[] = new Array<User>();
  bureaus : User[] = new Array<User>();

  dataSource = null;          //Store members in table format
  expandedElement: User;      //Expanded panel for description
  memberCount : number = 0;
  membersCount : number = 0;
  membersDisplayed : number = 0;
  displayedColumns: string[] = ['avatar','lastName','firstName'];
  membersLoading : boolean = false;
  isMobile = this.deviceService.isMobile();
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private userService:UserService,private location : Location,private deviceService: DeviceDetectorService) {}

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

  //Update html
  ngOnChanges(changes: SimpleChanges) {
    this.membersLoading = changes.membersLoading.currentValue;
  }
/*  redirectEmail(email) {
    this.location.go = 'mailto:' + email;
  }

  redirectPhone(phone) {
    this.location.path ='url(tel:' + phone + ')';
    //'tel:' + this.member.mobile; 
  }*/

  //Load Members
  loadAllMembers() {  
    this.membersLoading = true;
    let members = new Array<User>(); //Reset memebers 
      this._subscriptions.push(this.userService.getMembers().subscribe(res => {
        for (let member of res) {
          let user = new User(member);
          user.roles.push(new Role({name:"Membre"}));
          members.push(user);
        }
        this.dataSource = new MatTableDataSource(members);
        //Override filter to look only at first and last name
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.firstName.toLowerCase().includes(filter) || data.lastName.toLowerCase().includes(filter);
        };
        this.membersCount = members.length;
        this.membersDisplayed = members.length;
        this.membersLoading = false;
      })); 
  }

  //Filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.membersDisplayed = this.dataSource.filteredData.length;
  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

}
