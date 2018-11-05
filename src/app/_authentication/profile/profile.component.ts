import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {MakeSureDialogComponent} from '../../_library/make-sure-dialog/make-sure-dialog.component';
import {User} from "../../_models/user";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$  = this.userService.getCurrent();   //User data that is globally stored and sync
  title : string = "";
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private userService:UserService, private router: Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getCurrent().subscribe(res=> {
      this.title = res.getFormattedRoles();
    });
  }


  openUserRemoveDialog() {
    let dialogRef = this.dialog.open(MakeSureDialogComponent, {
      disableClose :true,
      data:  {title: "Effacer votre compte",
              text:"Attention cette operation est irreversible, vous allez effacer tous vos messages, vos documents..."
            } 
    });
    this._subscriptions.push(dialogRef.afterClosed().subscribe((result : boolean) => {
      if (result) {
        console.log("Result of dialog is : " + result);
        this._subscriptions.push(this.userService.delete().subscribe(result => {
          this.userService.setCurrent(new User(null));
          User.removeToken();
          this.router.navigate([""]); //Go back home
        }));
        //remove the account and redirect to home
        /*this.userService.removeAccount().subscribe(result => {
          //Remove the invalid token from localStorage and navigate home
          User.removeToken();
          this.userService.setCurrent(new User(null));
          this.router.navigate([""]); //Go back home
        }, error => {
          console.log("Error !!!!");
        });*/
      }
      console.log(result);
    }));
  }
/*  //We are now logging out
  logout() {
    this.userService.logout().subscribe(res=> {
      this.userService.setCurrent(new User(null));
      User.removeToken();
      this.router.navigate([""]); //Go back home
    });
  }*/
}
