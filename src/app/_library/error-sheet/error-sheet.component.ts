import { Component, OnInit, Inject } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';

@Component({
  selector: 'app-error-sheet',
  templateUrl: './error-sheet.component.html',
  styleUrls: ['./error-sheet.component.scss']
})
export class ErrorSheetComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheetRef: MatBottomSheetRef<ErrorSheetComponent>) { }

  ngOnInit() {
  }
  setClasses() {
    return {
      "http-alert-message": this.data.type == "error"?true:false,
      "http-success-message": this.data.type == "success"?true:false,
    }
  }
}
