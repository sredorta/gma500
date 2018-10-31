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

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //Returns all users wioth roles and accounts
  public getUsers() : Observable<any[]> {  
    return this.http.get<any[]>(environment.apiURL +'/admin/users');
  }  

  //Returns all defined roles
  public getRoles() : Observable<any[]> {  
    return this.http.get<any[]>(environment.apiURL +'/admin/roles');
  } 
}
