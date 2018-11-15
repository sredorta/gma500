import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../_services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {MakeSureDialogComponent} from '../../_library/make-sure-dialog/make-sure-dialog.component';
import {User} from "../../_models/user";
import {ImageSizes} from "../../_models/image";
import {Product} from "../../_models/product";
import { Attachment } from '../../_models/attachment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user : User = null;//$  = this.userService.getCurrent();   //User data that is globally stored and sync
  title : string = "";
  displayedColumns: string[] = ['id','image','cathegory','type','brand'];
  dataSource = null;          //Store products array in table format
  avatarSizeMobile : ImageSizes = ImageSizes.small;
  avatarSizeLarge : ImageSizes = ImageSizes.medium;
  loadingDocument : boolean = false;
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private userService:UserService, private router: Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getCurrent().subscribe(res=> {
      this.user = new User(res);
      this.title = res.getFormattedRoles();
      this.dataSource = new MatTableDataSource(res.products); //Initialize the material
    });
  }

  //Update html
  ngOnChanges(changes: SimpleChanges) {
    this.user = changes.user.currentValue;
  }

  openUserRemoveDialog() {
    let dialogRef = this.dialog.open(MakeSureDialogComponent, {
      disableClose :true,
      data:  {title: "Suprimer votre compte",
              text:"Attention cette operation est irreversible, vous allez effacer tous vos messages, vos documents..."
            } 
    });
    this._subscriptions.push(dialogRef.afterClosed().subscribe((result : boolean) => {
      if (result) {
        this._subscriptions.push(this.userService.delete().subscribe(result => {
          this.userService.setCurrent(new User(null));
          User.removeToken();
          this.router.navigate([""]); //Go back home
        }));
      }
    }));
  }

  //Logout user
  logout() {
    this._subscriptions.push(this.userService.logout().subscribe(res=> {
      this.userService.setCurrent(new User(null));
      User.removeToken();
      this.router.navigate([""]); //Go back home
    }));
  }
  
  addDocument(event) {
    //we recieve type and data
    //Now upload the document to the server
    this.loadingDocument = true;
    this._subscriptions.push(this.userService.addDocument(event.type,event.data).subscribe(result =>{
      //Create a fake attachment to update the gui quickly... polling will set it up correctly
      this.user.attachments.push(new Attachment({function:event.type,extension:"pdf"}));
      this.loadingDocument = false;
    }, err=> {
      this.loadingDocument = false;
    }));
  }



  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }


}
