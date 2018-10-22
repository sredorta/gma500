////////////////////////////////////////////////////////////////////////////////////////////
//  ConfigService:
//    This service downloads all configurable data from the database at the beginning
//    Then it's use to configure everything that is configurable
///////////////////////////////////////////////////////////////////////////////////////////

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import {UserService} from './user.service';
import { Config } from '../_models/config';
import {User, UserInterface } from '../_models/user';


@Injectable({
  providedIn: 'root'
})

export class ConfigService {


  dataDonwloaded: boolean = false;
  private _isDataDownloaded = new BehaviorSubject<boolean>(false); //Stores the current user

  private _data : Config = new Config(null);

  constructor(private http: HttpClient, private userService: UserService) { }

  //Starts the data download
  public init() {

    let delay;
    //Catch if token is expired
      Observable.forkJoin(
        Observable.of(delay).delay(environment.MIN_INIT_WAITING_DELAY),                  //Wait for a mimum delay of 2s
        this.userService.getAuthUser().catch(res => Observable.of(null)),
        this.http.get<any[]>(environment.apiURL +'/config/product/cathegories',{}),
        this.http.get<any[]>(environment.apiURL +'/config/product/types',{}),
      ).subscribe(data => {
        this.userService.setCurrent(new User(data[1]));
        console.log("We have current user:");
        console.log(this.userService.getCurrent());
        this._data.productCathegories = data[2];
        this._data.productTypes = data[3];
        console.log("Initial data:");
        console.log(this._data);
        this._isDataDownloaded.next(true);
      },err=> {
          console.log("There was an error : " + err);
      });

  }
  errorHandler(error:any) {
    console.log("Catched error: " + error);
  }

  //Returns the current data stored in config
  public get() : Config {
    return this._data;
  }

  //Returns an observable that tells if config has completed downloading
  public isCompleted() : Observable<boolean> {
    return this._isDataDownloaded;
  }

}
