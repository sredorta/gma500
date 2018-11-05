import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-make-sure-dialog',
  templateUrl: './make-sure-dialog.component.html',
  styleUrls: ['./make-sure-dialog.component.scss']
})
export class MakeSureDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef:MatDialogRef<MakeSureDialogComponent>) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }
}