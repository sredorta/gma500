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

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  constructor(private http: HttpClient) { 
  }

  public indexes(cathegory:string,type:string) : Observable<number[]> {
    return this.http.post<number[]>(environment.apiURL +'/products/indexes',{cathegory,type});
  }

  public getProducts() : Observable<Product[]> {
    return this.http.post<Product[]>(environment.apiURL +'/products/list',{});
  }  
  public getProduct(id:number) : Observable<Product> {
    return this.http.post<Product>(environment.apiURL +'/products/list',{id});
  }      

}
