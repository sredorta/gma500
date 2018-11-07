import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
import { ConfigService } from '../_services/config.service';
import { Router} from '@angular/router';
import {Product} from "../_models/product";
import {Config} from "../_models/config";
import {User} from "../_models/user";




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],  
})
export class ProductsComponent implements OnInit {
  user : User = new User(null);
  loading  : boolean = true;
  dataSource = null;          //Store products array in table format
  expandedElement: Product;   //Expanded panel for description
  productsCount : number = 0;
  displayedColumns: string[] = ['id','image','cathegory','type','usage','brand'];
  config : Config = this.configService.get();
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private userService:UserService, private productService:ProductService,private configService:ConfigService) { }

  ngOnInit() {
    this._subscriptions.push(this.userService.getCurrent().subscribe(res => {
      this.user = res;
    }));

    this._subscriptions.push(this.productService.getProducts().subscribe(res => {
      let products : Product[] =  new Array<Product>();
      for (let product of res) {
        product = new Product(product);
        products.push(product);
      }
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.idGMA.toLowerCase().includes(filter) || 
        data.cathegory.toLowerCase().includes(filter) ||
        data.type.toLowerCase().includes(filter) ||
        data.description.toLowerCase().includes(filter) ||
        data.brand.toLowerCase().includes(filter);
      };
      this.productsCount = products.length;
      this.loading = false;
    }));

  }
  //Filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.productsCount = this.dataSource.filteredData.length;
  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }


}
