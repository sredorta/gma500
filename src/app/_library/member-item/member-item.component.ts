import { Component, OnInit,Input,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//Dialogs
import {ProfileDialogComponent} from '../../_dialogs/profile-dialog/profile-dialog.component';
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
  @Input() member$ : Observable<User>;           //Member to display
  @Input() isPresident : boolean;
  @Input() user: User;                          //Current user
  @Input() short: boolean = true;
  @Input() activeRole: string;                  //Active role to be displayed

  isLogged: boolean = false;
  memberIsPresident : boolean = false;
  memberPhone:String= "";
  memberEmail:String = "";
  member : User = new User(null);
  isMobile = this.deviceService.isMobile();

  constructor(private location: Location, private userService:UserService, private deviceService: DeviceDetectorService,public dialog: MatDialog) {

  }

  ngOnInit() {
    this.userService.isLogged().subscribe(res=> this.isLogged = res);
    this.member$.subscribe(result => {
      this.member = result;
      this.memberEmail= 'mailto:' + this.member.email;
      this.memberPhone= 'tel:' + this.member.mobile; 
      if (this.activeRole == "board") {
        this.activeRole = result.title;
      } 
    });
  
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
