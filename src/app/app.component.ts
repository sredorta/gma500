import { Component, ViewEncapsulation } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
//Animations
import {routerTransition} from "./_helpers/animations"

import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import {User} from "./_models/user";
import { UserService } from './_services/user.service';
import { ConfigService } from './_services/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition]
})
export class AppComponent {
  title = 'gma500';
  selectedRoute : string;                           //We store the selected route in this variable
  user$  = this.userService.getCurrent();           //User data that is globally stored and sync
  user : User = new User(null);

  avatar_url = null;

  //isLoggedIn$ = this.userService.isLogged();
  isConfigDone$ = this.configService.isCompleted(); //Data download completion
  isMobile = true;//this.deviceService.isMobile();         //Detect if we are on a mobile device
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private router : Router, private userService:UserService, private configService: ConfigService, private deviceService: DeviceDetectorService) {
/*    this.configService.init();  //Download all initial data required, when finishes the isCompleted Observable becomes true

    //Detect router changes and then add class accordingly with selectedRoute property
    this._subscriptions.push(router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
          this.selectedRoute = event.url;
      }
    }));

    this._subscriptions.push(this.configService.isCompleted().subscribe(res=> {
      console.log("Config Service completed:");
    }));*/

    //TODO switch to websockets instead
    //Polling user
/*    interval(30000) //30seconds
    .pipe(
      startWith(0),
      switchMap(() => this.userService.getAuthUser())
    )
    .subscribe(res => {
      console.log("POLL");
      let user : User = new User(res);
      this.userService.setCurrent(user);
    });*/

    this._subscriptions.push(this.userService.getAuthUser().subscribe(res => {
      console.log(res);
      let user : User = new User(res);
      this.userService.setCurrent(user);
    }));


  }

  //We are now logging out
  logout() {
    this._subscriptions.push(this.userService.logout().subscribe(res=> {
      this.userService.setCurrent(new User(null));
      User.removeToken();
      this.router.navigate([""]); //Go back home
    }));
  }


 

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

}
