import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
import { ConfigService } from '../_services/config.service';
import { Router} from '@angular/router';
import {Product} from "../_models/product";
import {Config} from "../_models/config";
import {User} from "../_models/user";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  user$  = this.userService.getCurrent();  
  products$ : Observable<Product>[] = new Array<Observable<Product>>();
  productsCount : number = -1;

  config : Config = this.configService.get();
  private _request  = null;

  constructor(private userService:UserService, private productService:ProductService,private configService:ConfigService) { }

  ngOnInit() {

    //Load all products
    this.loadProducts();

  }

  //Load all products in function of cathegory or type
  //When inputs not defined, then we use 'all'
  loadProducts(cathegory?:string,type?:string) {
    this.products$ = new Array<Observable<Product>>();
    if (cathegory === undefined) cathegory = 'all';
    if (type === undefined) type = 'all';
   //We first get the indexes and then upload element one by one
   this.cancelRequests()
    this._request = this.productService.indexes(cathegory,type).subscribe((result:number[]) => {
      this.productsCount = result.length;
      result.forEach(id => {
        this.products$.push(this.productService.getProduct(id));
      });
    });    
  }

  //Cancel the http request
  cancelRequests() {
    if (this._request !== null) {
      this._request.unsubscribe();
    }
  }

  //Handle filter of Cathegories
  onCathegoriesChange(event:any) {
    this.loadProducts(event.value);
  }

}
