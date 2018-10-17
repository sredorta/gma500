import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
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
  selectedRoute : string;               //We store the selected route in this variable
  user$  = this.userService.getCurrent();   //User data that is globally stored and sync
  isConfigDone$ = this.configService.isCompleted();

  constructor(private router : Router, private userService:UserService, private configService: ConfigService ) {
    this.configService.init();
    this.configService.isCompleted().subscribe(result => {
      console.log("Completed result :");
      console.log(result);
    })
    //Detect router changes and then add class accordingly with selectedRoute property
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
          this.selectedRoute = event.url;
      }
    });
    this.userService.getCurrent().subscribe(res => {
      console.log("Current user:");
      console.log(res);
    })
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
      this.router.navigate([""]); //Go back home
    });
  }

}
