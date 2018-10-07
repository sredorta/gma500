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
import {FakeBackendInterceptor} from "../_helpers/fake-backend.interceptor";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _user = new BehaviorSubject<User>(new User(null));
  constructor(private http: HttpClient) { 

    //This is TMP to avoid loggin in manually  //////////////////////////////////////////////////////////////////
    let user2 = FakeBackendInterceptor.current;
    this._user.next(user2);    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  getUser() : Observable<User> {
    return this._user;
  }

  updateUser(user:User) {
    this._user.next(user);
  }

  public userSignup(firstName:string,lastName:string,email:string,mobile:string,password:string, avatar:string) {   
    let o = {firstName:firstName,lastName:lastName,email:email,mobile:mobile,password:password,avatar:avatar};
    console.log(o);
    return this.http.post<User>(environment.apiURL +'/users/create', {firstName,lastName,email,mobile,password,avatar});
  }

  public userLogin(email:string, password:string) : Observable<User> {   
    return this.http.post<User>(environment.apiURL +'/users/login', {email, password});
  }

  public userResetPassword(email:string) : Observable<any> {
    return this.http.post<User>(environment.apiURL +'/users/resetpassword', {email});
  }

  public userLogout() : Observable<any> {
    return this.http.post<User>(environment.apiURL +'/users/logout',{});
  }  

  public getMembers(role:string) : Observable<User[]> {
    return this.http.post<User[]>(environment.apiURL +'/users/list',{role});
  }



}
