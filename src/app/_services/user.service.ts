import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../_models/user';
import { Product } from '../_models/product';
import {FakeBackendInterceptor} from "../_helpers/fake-backend.interceptor";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn : boolean = false; //This is used for Guards
  private _user = new BehaviorSubject<User>(new User(null)); //Stores the current user

  constructor(private http: HttpClient) { 
    //This is TMP to avoid loggin in manually  //////////////////////////////////////////////////////////////////
    let user2 = FakeBackendInterceptor.current;
    this._user.next(user2);    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //Needed for guards
    this._user.subscribe(result => {
      this.isLoggedIn = result.isLoggedIn;
    });
  }

  //Returns current user
  getCurrent() : Observable<User> {
    return this._user;
  }

  //Sets current user
  setCurrent(user:User) {
    this._user.next(user);
  }


  public signup(firstName:string,lastName:string,email:string,mobile:string,password:string, avatar:string) {   
    let o = {firstName:firstName,lastName:lastName,email:email,mobile:mobile,password:password,avatar:avatar};
    console.log(o);
    return this.http.post<User>(environment.apiURL +'/users/create', {firstName,lastName,email,mobile,password,avatar});
  }

  public login(email:string, password:string) : Observable<User> {   
    return this.http.post<User>(environment.apiURL +'/users/login', {email, password});
  }

  public resetPassword(email:string) : Observable<any> {
    return this.http.post<User>(environment.apiURL +'/users/resetpassword', {email});
  }

  public logout() : Observable<any> {
    return this.http.post<User>(environment.apiURL +'/users/logout',{});
  }  




  public getPresident() : Observable<User[]> {
     let role : string = "president";
     return this.http.post<User[]>(environment.apiURL +'/users/list',{role});
  }

  public getMembers() : Observable<User[]> {
    let role : string = "member";
    return this.http.post<User[]>(environment.apiURL +'/users/list',{role});
  }
  public getBureau() : Observable<User[]> {
    let role : string = "bureau";
    return this.http.post<User[]>(environment.apiURL +'/users/list', {role});
  }

  public getBoard() : Observable<User[]> {
    let role : string = "board";
    return this.http.post<User[]>(environment.apiURL +'/users/list', {role});
  }
  

}
