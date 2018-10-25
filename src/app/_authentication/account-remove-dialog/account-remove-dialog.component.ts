import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-account-remove-dialog',
  templateUrl: './account-remove-dialog.component.html',
  styleUrls: ['./account-remove-dialog.component.scss']
})
export class AccountRemoveDialogComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<AccountRemoveDialogComponent>) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  removeAccount() {
    console.log("Removing account");
  }

}
