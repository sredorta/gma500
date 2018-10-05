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

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  public userSignup(firstName:string,lastName:string,email:string,mobile:string,password:string, avatar:string) {   
    let o = {firstName:firstName,lastName:lastName,email:email,mobile:mobile,password:password,avatar:avatar};
    console.log(o);
    return this.http.post<any>(environment.apiURL +'/users/create', {firstName,lastName,email,mobile,password,avatar});
  }

  public userLogin(email:string, password:string) : Observable<any> {   
    console.log("here !");
    return this.http.post<any>(environment.apiURL +'/users/login', {email, password});
  }

  public userResetPassword(email:string) : Observable<any> {
    return this.http.post<any>(environment.apiURL +'/users/resetpassword', {email});
  }


}
