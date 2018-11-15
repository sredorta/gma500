import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User, UserInterface,UserTokenInterface,UserMultipleAccessInterface } from '../_models/user';
import { Product } from '../_models/product';
//import {FakeBackendInterceptor} from "../_helpers/fake-backend.interceptor";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //public isLoggedIn : boolean = false; //This is used for Guards
  private _user = new BehaviorSubject<User>(new User(null)); //Stores the current user

  constructor(private http: HttpClient) { }

  //Returns current user
  getCurrent() : Observable<User> {
    return this._user;
  }

  //Sets current user
  setCurrent(user:User) {
    console.log("setCurrent::");
    console.log(user);
    this._user.next(user);
  }

  /*public test() : Observable<any> {
    return this.http.get<any>(environment.apiURL+'/test');
  }*/

  //Gets the authenticated user (current user, or null if token is not valid or no token)
  public getAuthUser() : Observable<any> {
    console.log("accessing to: "+ environment.apiURL+'/auth/user');
    return this.http.get<any>(environment.apiURL+'/auth/user').map(res => <any>res);
  }

  //Invalidates token for logout
  public logout() : Observable<any> {   
    //this.setCurrent(null);
    //User.removeToken();
    return this.http.post<any>(environment.apiURL +'/auth/logout', {});
  }

  //Return token from credentials
  public login(email:string, password:string, keepconnected:boolean,access:string) : Observable<any> {   
    return this.http.post<any>(environment.apiURL +'/auth/login', {email, password, keepconnected,access});
  }

  //Creates user and returns token
  public signup(firstName:string,lastName:string,email:string,mobile:string,password:string, avatar:string) : Observable<UserTokenInterface> {   
    return this.http.post<UserTokenInterface>(environment.apiURL +'/auth/signup', {firstName,lastName,email,mobile,password,avatar}).map(res => <UserTokenInterface>res);
  }

  //Updates the logged in user profile
  public update(user : User, password_old?:string) : Observable<any> {   
    if (user.firstName != null)
      return this.http.post<any>(environment.apiURL +'/auth/update', {firstName:user.firstName});
    if (user.lastName != null)
      return this.http.post<any>(environment.apiURL +'/auth/update', {lastName:user.lastName});
    if (user.mobile != null)
      return this.http.post<any>(environment.apiURL +'/auth/update', {mobile:user.mobile});
    if (user.avatar != null)
      return this.http.post<any>(environment.apiURL +'/auth/update', {avatar:user.avatar});
    if (user.email != null)
      return this.http.post<any>(environment.apiURL +'/auth/update', {email:user.email});
    if (user.password != null)
      return this.http.post<any>(environment.apiURL +'/auth/update', {password_new:user.password,password_old:password_old});
  }

  public addDocument(type,data) : Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.apiURL + '/user/document/add', {function:type, base64:data});
  }

  //Deletes the profile and all associated data !
  public delete() : Observable<any> {
    return this.http.delete<any>(environment.apiURL +'/auth/delete');
  }

  //Resets password and send email to user
  public resetPassword(email:string,access:string) : Observable<any> {
    return this.http.post<any>(environment.apiURL +'/auth/resetpassword', {email,access});
  }

  //Removes current account
  public removeAccount() : Observable<any> {
    return this.http.get<any>(environment.apiURL +'/auth/removeaccount');
  }  

  //Restores an account when profile has no accounts
  public restoreAccount(email:string,mobile:string) : Observable<any> {
    return this.http.post<any>(environment.apiURL +'/auth/restoreaccount',{email,mobile});
  }  

  //Get all notifications from user
  public notifications() :Observable<any> {
    return this.http.get<any>(environment.apiURL +'/notifications/getAll');
  }   

  //Mark a notification as read
  public notificationMarkRead(id:number) :Observable<any> {
    return this.http.post<any>(environment.apiURL +'/notifications/markread', {'id': id});
  }

  //Delete a notification
  public notificationDelete(id:number) :Observable<any> {
    return this.http.post<any>(environment.apiURL +'/notifications/delete', {'id': id});
  } 

  //Returns the list of users (only indexes) matching the type : member,bureau,board
  public getUsersByType(type:'board'|'bureau'|'member'|'all') : Observable<number[]> {  
    //Type has to be one of: member, board, bureau 
    return this.http.post<number[]>(environment.apiURL +'/users/indexes', {"type":type});
  }

  //Returns the data of the user specified in the id
  public getUserById(id:number) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/users/data', {'id':id}).debounceTime(300);
  }

  //Returns all members
  public getMembers() : Observable<any[]> {  
    return this.http.get<any[]>(environment.apiURL +'/users/getmembers');
  }  

}
