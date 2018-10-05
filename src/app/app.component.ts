import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
//Animations
import {routerTransition} from "./_helpers/animations"
import {User} from "./_models/user";
import { HttpService } from './_services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'gma500';
  selectedRoute : string;               //We store the selected route in this variable
  user  = this.httpService.getUser();   //User data that is globally stored and sync

  constructor(private router : Router, private httpService:HttpService ) {
    //Detect router changes and then add class accordingly with selectedRoute property
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
          this.selectedRoute = event.url;
      }
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
    this.httpService.userLogout().subscribe(res=> {
      this.httpService.updateUser(new User());
    });
  }

}
