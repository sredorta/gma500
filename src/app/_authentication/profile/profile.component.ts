import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../_services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user  = this.httpService.getUser();   //User data that is globally stored and sync
  constructor(private httpService:HttpService) { }

  ngOnInit() {
  }

}
