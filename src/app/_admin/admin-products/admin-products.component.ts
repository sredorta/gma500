import { Component, OnInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MakeSureDialogComponent} from '../../_library/make-sure-dialog/make-sure-dialog.component';
import {MatTable, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UserService } from '../../_services/user.service';
import { ProductService } from '../../_services/product.service';
import { AdminService } from '../../_services/admin.service';
import { ConfigService } from '../../_services/config.service';
import { Router} from '@angular/router';
import {Product} from "../../_models/product";
import {Config} from "../../_models/config";
import {User} from "../../_models/user";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ], 
})

export class AdminProductsComponent implements OnInit {
  user : User = new User(null);
  loading  : boolean = true;
  dataSource = null;          //Store products array in table format
  dataSourceMember = null;    //Store members in array format for search
  expandedElement: Product;   //Expanded panel for description
  productsCount : number = 0;
  productsTotal : number = 0;
  membersCount : number = 0;  //Count of member match
  memberAssigned : User = new User(null); //Member to whom the product is assigned
  displayedColumns: string[] = ['id','image','cathegory','type','usage','brand'];
  lastFilter = "";            //Contains last filter call;
  members : User[] = new Array<User>();
  config : Config = this.configService.get();

  productTypes = this.configService.get().productTypes;
  productCathegories = this.configService.get().productCathegories;
  @ViewChild('myTable') table : MatTable<any>;           //MatTable for rendering 
  myForm: FormGroup; 
  private _subscriptions : Subscription[] = new Array<Subscription>();

  constructor(private userService:UserService, private productService:ProductService,private adminService:AdminService,private configService:ConfigService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this.myForm =  new FormGroup({ search: new FormControl('',null)});
    
    this._subscriptions.push(this.userService.getCurrent().subscribe(res => {
      this.user = res;
    }));

    this._subscriptions.push(this.userService.getMembers().subscribe(res => {
      for (let user of res) {
        this.members.push(new User(user));
      }
      this.dataSourceMember = new MatTableDataSource(this.members);
      //Override filter to look only at first and last name
      this.dataSourceMember.filterPredicate = function(data, filter: string): boolean {
          return data.firstName.toLowerCase().includes(filter) || data.lastName.toLowerCase().includes(filter);
      };
      this._subscriptions.push(this.productService.getProducts().subscribe(res => {
        let products : Product[] =  new Array<Product>();
        for (let product of res) {
          product = new Product(product);
          products.push(product);
        }
        this.dataSource = new MatTableDataSource(products);
        //Override filter
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.idGMA.toLowerCase().includes(filter) || 
          data.cathegory.toLowerCase().includes(filter) ||
          data.type.toLowerCase().includes(filter) ||
          data.description.toLowerCase().includes(filter) ||
          data.brand.toLowerCase().includes(filter);
      };
        this.productsCount = products.length;
        this.productsTotal = products.length;
        this.loading = false;
      }));
    }));
  }

  //Update html
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = changes.dataSource.currentValue;
    //this.memberAssigned = changes.memberAssigned.currentValue;
  }

  //Filter on Products
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.productsCount = this.dataSource.filteredData.length;
    this.lastFilter = filterValue;
  }


   //Filter on Members
   applyFilterMember(filterValue: string) {
    this.dataSourceMember.filter = filterValue.trim().toLowerCase();
    this.membersCount = this.dataSourceMember.filteredData.length;
  } 

  //getMember from id
  getMember(id:number) {
    return this.dataSourceMember.data.find(i => i.id === id);
  }

  //Assign product
  assignProduct(product_id:number, member_id:number) {
    this._subscriptions.push(this.adminService.attachUserToProduct(product_id,member_id).subscribe(result=>{
      const itemIndex = this.dataSource.data.findIndex(obj => obj.id === product_id);
      this.dataSource.data[itemIndex].profile_id = member_id;
      this.dataSource.data[itemIndex].profile = this.dataSourceMember.data.find(i => i.id === member_id); 
      this.memberAssigned = this.getMember(member_id);
    })); 
  }
  //Unasign product
  unassignProduct(product_id:number) {
    this._subscriptions.push(this.adminService.detachUserFromProduct(product_id).subscribe(result=>{
      const itemIndex = this.dataSource.data.findIndex(obj => obj.id === product_id);
      this.dataSource.data[itemIndex].profile_id = null;
      this.dataSource.data[itemIndex].profile = null; 
    })); 
  }
  //Removes a product
  removeProduct(product_id: number) {
    let dialogRef = this.dialog.open(MakeSureDialogComponent, {
      disableClose :true,
      panelClass : "admin-theme",
      data:  {title: "Suprimer ce matériel",
              text:"Attention cette opération est irreversible. Etes vous sur de vouloir le supprimer ?"
            } 
    });
    this._subscriptions.push(dialogRef.afterClosed().subscribe((result : boolean) => {
      if (result) {    
        this._subscriptions.push(this.adminService.deleteProduct(product_id).subscribe(result=>{
          const itemIndex = this.dataSource.data.findIndex(obj => obj.id === product_id);
          this.dataSource.data.splice(itemIndex, 1); 
          const itemIndexFilter = this.dataSource.filteredData.findIndex(obj => obj.id === product_id);
          if (itemIndexFilter>=0) {
            this.dataSource.filteredData.splice(itemIndexFilter, 1); 
          }
          this.table.renderRows();
          this.productsTotal = this.dataSource.data.length;
          this.productsCount = this.dataSource.filteredData.length;
        }));   
      } 
    }));    
  }

  //Create a new product
  createProduct(product : Product) {
    product.image = 'url(' + product.image + ')';
    product.profile_id = null;
    this._subscriptions.push(this.adminService.createProduct(product).subscribe(result=>{
      console.log(result);
      product.id = result;
      this.dataSource.data.push(product);
      this.productsTotal = this.dataSource.data.length;
      this.applyFilter(this.lastFilter);

      this.table.renderRows();
      this.productsTotal = this.dataSource.data.length;
      this.productsCount = this.dataSource.filteredData.length;
    }));       
  }

  //Reset memberSearch input
  rowClick(profile_id:number) {
    this.myForm.reset();
    this.membersCount = this.dataSourceMember.data.length;
    if (profile_id !== null)
      this.memberAssigned = this.getMember(profile_id);
    else
      this.memberAssigned = new User(null);
  }

  ngOnDestroy() {    
    //Unsubscribe to all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
