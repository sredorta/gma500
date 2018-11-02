import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router} from '@angular/router';
import {AccountRemoveDialogComponent} from '../account-remove-dialog/account-remove-dialog.component';
import {User} from "../../_models/user";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$  = this.userService.getCurrent();   //User data that is globally stored and sync
  title : string = "";
  constructor(private userService:UserService, private router: Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getCurrent().subscribe(res=> {
      console.log("In getCurrentUser of profile");
      console.log(res);
      this.title = res.getFormattedRoles();
    });
  }


  openAccountRemoveDialog() {
    let dialogRef = this.dialog.open(AccountRemoveDialogComponent, {
      disableClose :true,
      //panelClass: 'big-dialog',
      //width: '80%',
      //height: '80%',
      data:  null 
    });
    dialogRef.afterClosed().subscribe((result : boolean) => {
      if (result) {
        //remove the account and redirect to home
        this.userService.removeAccount().subscribe(result => {
          //Remove the invalid token from localStorage and navigate home
          User.removeToken();
          this.userService.setCurrent(new User(null));
          this.router.navigate([""]); //Go back home
        }, error => {
          console.log("Error !!!!");
        });
      }
      console.log(result);
    });
  }
  //We are now logging out
  logout() {
    this.userService.logout().subscribe(res=> {
      this.userService.setCurrent(new User(null));
      this.router.navigate([""]); //Go back home
    });
  }
}
