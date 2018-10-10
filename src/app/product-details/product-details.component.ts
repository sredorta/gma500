import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpService} from '../_services/http.service';
import {Product} from '../_models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id:number;
  user = this.httpService.getUser();  //Get current user for detecting rights...
  productReady :boolean = false;
  product : Product = null;

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      //Load details now
      this.httpService.getProduct(this.id).subscribe(result => {
          this.product = new Product(result);
          this.productReady = true;
      });

   });   
  }

}
