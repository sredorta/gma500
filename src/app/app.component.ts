import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
//Animations
import {routerTransition} from "./_helpers/animations"


import {User} from "./_models/user";
import { UserService } from './_services/user.service';
import { ConfigService } from './_services/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'gma500';
  selectedRoute : string;                           //We store the selected route in this variable
  user$  = this.userService.getCurrent();           //User data that is globally stored and sync
  isLoggedIn$ = this.userService.isLogged();
  isConfigDone$ = this.configService.isCompleted(); //Data download completion
  isMobile = true;//this.deviceService.isMobile();         //Detect if we are on a mobile device

  constructor(private router : Router, private userService:UserService, private configService: ConfigService, private deviceService: DeviceDetectorService) {
    this.configService.init();  //Download all initial data required, when finishes the isCompleted Observable becomes true

    //Detect router changes and then add class accordingly with selectedRoute property
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
          this.selectedRoute = event.url;
      }
    });
    this.isLoggedIn$.subscribe(res=> {
      console.log("YOU ARE LOGGED IN ? : "+ res);
    });
    this.configService.isCompleted().subscribe(res=> {
      console.log("Config Service completed:");
      console.log(res);
    });
  }
/*    
    this.httpService.getUser().subscribe(
      (res:User)=> {
        console.log("USER has changed !");
        console.log(res);
        //this.user = res;
      }
    );
  }*/

  //We are now logging out
  logout() {
    this.userService.logout().subscribe(res=> {
      this.userService.setCurrent(new User(null));
      User.removeToken();
      this.router.navigate([""]); //Go back home
    });
  }

}
