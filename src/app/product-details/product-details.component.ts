import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../_services/user.service';
import {ProductService} from '../_services/product.service';
import {Product} from '../_models/product';
import { User } from '../_models/user';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id:number;
  user$ = this.userService.getCurrent();  //Get current user for detecting rights...
  product : Product = new Product(null);
  loading : boolean = true;
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private route: ActivatedRoute, private userService: UserService, private productService: ProductService) { }

  ngOnInit() {
    this._subscriptions.push(this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this._subscriptions.push(this.productService.getProduct(this.id).subscribe(res => {
        this.product = new Product(res);
        this.loading = false;
      }));
   }));   
  }
  //Update html
  ngOnChanges(changes: SimpleChanges) {
    this.loading = changes.loading.currentValue;
  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
