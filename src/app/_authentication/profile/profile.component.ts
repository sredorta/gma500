import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../_services/http.service';
import { Router} from '@angular/router';
import {User} from "../../_models/user";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user  = this.httpService.getUser();   //User data that is globally stored and sync
  constructor(private httpService:HttpService, private router: Router) { }

  ngOnInit() {

  }


  //We are now logging out
  logout() {
    this.httpService.userLogout().subscribe(res=> {
      this.httpService.updateUser(new User(null));
      this.router.navigate([""]); //Go back home
    });
  }
}
