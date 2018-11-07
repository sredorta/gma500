import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../_services/user.service';
import {User} from './../_models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  constructor(private userService : UserService, private router : Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      if(!User.hasValidToken()) {
        return true;
      } else {
        this.router.navigate([''])
        return false;
      }      

  }
}
