import { Component, OnInit,Input,Inject,SimpleChanges } from '@angular/core';
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
  @Input() member: User;

 // memberEmail : string;
 // memberPhone : string;

  isMobile = this.deviceService.isMobile();

  constructor(private location : Location,private deviceService: DeviceDetectorService,public dialog: MatDialog) {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.member = changes.member.currentValue;
  }
  
  redirectEmail() {
    //this.location.go = 'mailto:' + this.member.email;
  }

  redirectPhone() {
    //'tel:' + this.member.mobile; 
  }

  ngOnInit() {
  //  this.memberEmail= 'mailto:' + this.member.email;
  //  this.memberPhone= 'tel:' + this.member.mobile; 


  /*  this.userService.isLogged().subscribe(res=> this.isLogged = res);
    this.member$.subscribe(result => {
      this.member = result;
      this.memberEmail= 'mailto:' + this.member.email;
      this.memberPhone= 'tel:' + this.member.mobile; 
      if (this.activeRole == "board") {
        this.activeRole = result.title;
      } 
    });
  */
  }

    //Terms and conditions dialog
 /*   openProfileDialog(): void {
      let dialogRef = this.dialog.open(ProfileDialogComponent, {
        panelClass: 'big-dialog',
        maxHeight:"90%",
        minWidth:"300px",
        data:  {user: this.user, member:this.member}
      });
    }*/
}
