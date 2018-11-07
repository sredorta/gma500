import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {User} from "../_models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  avatar : string = './assets/img/user-default.jpg';
  user : User = new User(null);
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getCurrent().subscribe(res=> {
      this.user = res;
    })
  }


  loginTest() {
    this.userService.login('sergi.redorta12@kubiiks.com','Member0',false,'Membre').subscribe(res=> {
      User.saveToken(res.token);   //Save Token to session storage
      //We need to download here the profile of the user
      this.userService.getAuthUser().subscribe(res=> {
        this.userService.setCurrent(new User(res)); 
      });
    });
  }


  logoutTest() {

    this.userService.getMembers().subscribe(res => {
    });

  }

}
