import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from './../_models/user';
import { Router } from '@angular/router';
import {UserService} from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAdmin : boolean = false;
  constructor(private userService : UserService, private router : Router) {
    this.userService.getCurrent().subscribe(res => {
      this.isAdmin = res.hasAccess('Admin');
    })
  }  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return true; //////////TMP !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      console.log("in AdminGuard !!!!!!!!!!!!!!!!!");
      if (this.isAdmin) return true;
      else {
        this.router.navigate([''])
        return false;
      }
  }
}
