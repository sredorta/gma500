import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
//Animations
import {routerTransition} from "./_helpers/animations"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'gma500';
  selectedRoute : string; //We store the selected route in this variable

  constructor(private router : Router ) {
    //Detect router changes and then add class accordingly with selectedRoute property
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
          this.selectedRoute = event.url;
      }
    });
  }

}
