import { Component, OnInit,Input,Inject,SimpleChanges } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {User} from '../../_models/user';
import { Location } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit {
  //Inputs
  @Input() member: User;
  @Input() style : string = "normal";

  isNormal : boolean;
  isSmall :boolean;
  showExpansion : boolean = false;  //Expansion on small format

  isMobile = this.deviceService.isMobile();

  constructor(private location : Location,private deviceService: DeviceDetectorService) {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.member = changes.member.currentValue;
  }
  

  ngOnInit() {
    this.isNormal = this.style == "normal"?true:false;
    this.isSmall = this.style == "small"?true:false;
  }

  toggleExpansion() {
    this.showExpansion = !this.showExpansion;
  }
}
