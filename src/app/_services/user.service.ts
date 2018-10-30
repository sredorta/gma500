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
  private _isLoggedIn = new BehaviorSubject<boolean>(false);



  constructor(private http: HttpClient) { 
    
    //Needed for guards
 /*   this._isLoggedIn.subscribe(result => {
      console.log("Setting guard to : isLoggedIn : " + result)
      this.isLoggedIn = result;
    });*/
  }




  //Returns current user
  getCurrent() : Observable<User> {
    return this._user;
  }

  //Sets current user
  setCurrent(user:User) {
    console.log("setCurrent::");
    console.log(user);
    this._user.next(user);
    //Broadcast if we are now loggedIn or not
    if (user.id !== undefined && user.id>=0) {
      this.setLogged(true);
    } else {
      this.setLogged(false);
    }
  }

  //Returns observable with user if loggedIn or not
  public isLogged() : Observable<boolean> {
    return this._isLoggedIn;
  }

  //Sets value that tracks if user is loggedIn or not
  public setLogged(value:boolean) {
    this._isLoggedIn.next(value);
  }


  /*public test() : Observable<any> {
    return this.http.get<any>(environment.apiURL+'/test');
  }*/

  //Gets the authenticated user (current user, or null if token is not valid or no token)
  public getAuthUser() : Observable<UserInterface> {
    return this.http.get<UserInterface>(environment.apiURL+'/auth/user').map(res => <UserInterface>res);
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
