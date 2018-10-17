import { Component, OnInit,Input,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
//Dialogs
import {ProfileDialogComponent} from '../../_dialogs/profile-dialog/profile-dialog.component';
import { Observable } from 'rxjs';
import {User} from '../../_models/user';
import {Product} from '../../_models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  //Inputs
  @Input() product$ : Observable<Product>;          //Product to display
  @Input() user : User;                             //Current user
  @Input() short: boolean = true;                   //Short or long view

  isMobile = this.deviceService.isMobile();
  isMember : boolean = false;
  constructor( private deviceService: DeviceDetectorService,public dialog: MatDialog) { }

  ngOnInit() {
    this.isMember = this.user.isMember();
  }

}
