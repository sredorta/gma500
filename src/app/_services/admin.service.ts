import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Product} from '../_models/product';

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

  //Returns all defined groups
  public getGroups() : Observable<any[]> {  
    return this.http.get<any[]>(environment.apiURL +'/admin/groups');
  } 

  //Adds a role to a profile
  public addRoleToUser(user_id:number, role_id:number) : Observable<any[]> {  
    return this.http.post<any[]>(environment.apiURL +'/admin/roles/attach',{profile_id:user_id,role_id:role_id});
  } 

  //Adds a role to a profile
  public removeRoleToUser(user_id:number, role_id:number) : Observable<any[]> {  
    return this.http.post<any[]>(environment.apiURL +'/admin/roles/detach',{profile_id:user_id,role_id:role_id});
  }   

  //Create a new role
  public createRole(name:string, description:string) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/roles/create',{name:name, description:description});
  } 
  //Delete a role
  public deleteRole(id:number) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/roles/delete',{id:id});
  }   

  //Create a new role
  public createGroup(name:string, description:string) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/groups/create',{name:name, description:description});
  } 
  //Delete a role
  public deleteGroup(id:number) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/groups/delete',{id:id});
  }   



  //Adds a group to a profile
  public addGroupToUser(user_id:number, group_id:number) : Observable<any[]> {  
    return this.http.post<any[]>(environment.apiURL +'/admin/groups/attach',{profile_id:user_id,group_id:group_id});
  } 

  //Removes a group to a profile
  public removeGroupToUser(user_id:number, group_id:number) : Observable<any[]> {  
    return this.http.post<any[]>(environment.apiURL +'/admin/groups/detach',{profile_id:user_id,group_id:group_id});
  }

  //Adds an account to a user
  public addAccountToUser(user_id:number, access:string) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/accounts/add',{profile_id:user_id,access:access});
  } 
  //Removes account to user
  public removeAccountToUser(user_id:number, access:string) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/accounts/remove',{profile_id:user_id,access:access});
  } 

  //Toggle access from Pré-Inscrit to Membre
  public toggleAccountMember(user_id:number) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/accounts/toggle',{profile_id:user_id});
  } 

  //Delete a profile and all associated data
  public deleteUser(user_id:number) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/users/delete',{profile_id:user_id});
  }   

  //Delete a product
  public deleteProduct(product_id:number) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/products/delete',{product_id:product_id});
  }   

  //Delete a product
  public createProduct(product:Product) : Observable<any> {  
      return this.http.post<any>(environment.apiURL +'/admin/products/create',
        { image : product.image,
          cathegory : product.cathegory,
          type : product.type,
          brand : product.brand,
          description : product.description,
          usage : product.usage,
          idGMA : product.idGMA,
          serialNumber : product.serialNumber,
          fabricatedOn : product.fabricatedOn,
          expiresOn : product.expiresOn,
          boughtOn : product.boughtOn,
          docLink : product.docLink
        });
  } 
  //Dettach user from Product
  public detachUserFromProduct(product_id:number) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/products/detach',{product_id:product_id});
  }  

  //Attach user to Product
  public attachUserToProduct(product_id:number, user_id:number) : Observable<any> {  
    return this.http.post<any>(environment.apiURL +'/admin/products/attach', {product_id:product_id, profile_id:user_id});
  }   


}
