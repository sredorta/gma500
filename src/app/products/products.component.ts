import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
import { Router} from '@angular/router';
import {Product} from "../_models/product";
import {User} from "../_models/user";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  user$  = this.userService.getCurrent();
  productsReady :boolean = false;
  products: Product[] = [];
  
  constructor(private userService:UserService, private productService:ProductService) { }

  ngOnInit() {
    //Load all products
    this.productService.getProducts().subscribe((result:Product[]) => {
      this.products = result;
      this.productsReady = true;
      console.log(this.products);
  });    
  }

}
