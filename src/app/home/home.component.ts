import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {User} from "../_models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    //this.userService.test();
  }

}
