import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router} from '@angular/router';
import {Product} from "../_models/product";
import {User} from "../_models/user";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  user  = this.httpService.getUser();
  productsReady :boolean = false;
  products: Product[] = [];
  
  constructor(private httpService:HttpService) { }

  ngOnInit() {
    //Load all products
    this.httpService.getProducts().subscribe((result:Product[]) => {
      this.products = result;
      this.productsReady = true;
      console.log(this.products);
  });    
  }

}
