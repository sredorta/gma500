import { Component, OnInit,Input,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//Dialogs
import {ProfileDialogComponent} from '../../_dialogs/profile-dialog/profile-dialog.component';
import {HttpService} from '../../_services/http.service';
import {User} from '../../_models/user';
import { Location } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit {
  //Inputs
  @Input() member : User;           //Member to display
  @Input() isPresident : boolean;
  @Input() user: User;              //Current user
  @Input() short: boolean = true;
  @Input() activeRole: string;      //Active role to be displayed or all if not specified

  memberIsPresident : boolean = false;
  memberPhone:String= "";
  memberEmail:String = "";
  isMobile = this.deviceService.isMobile();

  constructor(private location: Location, private httpService:HttpService, private deviceService: DeviceDetectorService,public dialog: MatDialog) {

  }

  ngOnInit() {
    this.memberEmail= 'mailto:' + this.member.email;
    this.memberPhone= 'tel:' + this.member.mobile;

    if(this.activeRole == null) {
      this.activeRole = this.member.getFormattedRoles();
    } else {
      this.activeRole = this.member.getFormattedRole(this.activeRole);
    }
    if (this.member.isPresident()) {
      this.memberIsPresident = true;
    }
  }

    //Terms and conditions dialog
    openProfileDialog(): void {
      let dialogRef = this.dialog.open(ProfileDialogComponent, {
        panelClass: 'big-dialog',
        maxHeight:"90%",
        minWidth:"300px",
        data:  {user: this.user, member:this.member}
      });
    }
}
