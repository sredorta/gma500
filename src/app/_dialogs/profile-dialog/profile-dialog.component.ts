import { Component, OnInit, Inject } from '@angular/core';
import {User} from "../../_models/user";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  user: User;
  member: User;
}

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  user : User;
  member : User;

  constructor(dialogRef: MatDialogRef<ProfileDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    //Assign data
    this.user = this.data.user;
    this.member = this.data.member;
  }

}
