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
  constructor(private userService: UserService) { }

  ngOnInit() {
/*    this.userService.restoreAccount("sergi.redorta@hotmail.com","0623133212").subscribe(res=> {
      console.log("Result from test :");
      console.log(res);
    });*/
  }


  //Update photo if we change it
  onImageChange(photo:string) {
    this.avatar = photo;
  }
}
