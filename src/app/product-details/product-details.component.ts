import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../_services/user.service';
import {ProductService} from '../_services/product.service';
import {Product} from '../_models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id:number;
  user$ = this.userService.getCurrent();  //Get current user for detecting rights...
  product$ : Observable<Product> = null;

  constructor(private route: ActivatedRoute, private userService: UserService, private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.product$ = this.productService.getProduct(this.id);
   });   
  }

}
