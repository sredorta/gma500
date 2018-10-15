import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router} from '@angular/router';
import {User} from "../../_models/user";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$  = this.userService.getCurrent();   //User data that is globally stored and sync
  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {

  }


  //We are now logging out
  logout() {
    this.userService.logout().subscribe(res=> {
      this.userService.setCurrent(new User(null));
      this.router.navigate([""]); //Go back home
    });
  }
}
