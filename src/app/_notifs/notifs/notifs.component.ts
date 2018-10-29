import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import {Notif} from '../../_models/notif';
import { User } from '../../_models/user';

@Component({
  selector: 'app-notifs',
  templateUrl: './notifs.component.html',
  styleUrls: ['./notifs.component.scss']
})
export class NotifsComponent implements OnInit {

  private _subscriptions : Subscription[] = new Array<Subscription>();
  notifs : Notif[] = new Array<Notif>();
  private _user : User = new User(null);

  constructor(private userService:UserService) { }

  ngOnInit() {
    this._subscriptions.push(this.userService.getCurrent().subscribe(res=>this._user = res));
    //Download user Notifs
    this._subscriptions.push(this.userService.notifications().subscribe(res => {
      console.log("Notifications !!!!!!!!!!!");
      console.log(res);
      this.notifs = res;
    }));    
  }


 //Notifications handling part
 notifMarkAsRead(id) {
  this._subscriptions.push(this.userService.notificationMarkRead(id).subscribe(res => {
    this.notifs.find(obj => obj.id == id).isRead = true;
    //Update the notifsUnreadCount counter
    this._user.notifsUnreadCount = this._user.notifsUnreadCount - 1;
    this.userService.setCurrent(this._user);
  }));
  //this.
}

notifDelete(id) {
  console.log("Deleting");
  this._subscriptions.push(this.userService.notificationDelete(id).subscribe(res => {
    if (!this.notifs[this.notifs.findIndex(obj => obj.id == id)].isRead) {
      this._user.notifsUnreadCount = this._user.notifsUnreadCount - 1;
      this.userService.setCurrent(this._user);
    }
    this.notifs.splice(this.notifs.findIndex(obj => obj.id == id),1)
  }));

}

ngOnDestroy() {    
  //Unsubscribe to all
  for (let subscription of this._subscriptions) {
    subscription.unsubscribe();
  }
}
}
