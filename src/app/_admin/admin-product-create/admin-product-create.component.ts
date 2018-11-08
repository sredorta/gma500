import { Component, OnInit, Input,Output, EventEmitter, ViewChild} from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {MatExpansionPanel} from '@angular/material';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
//Import all shared logic required for forms handling
import {CustomValidators, ParentErrorStateMatcher  } from '../../_helpers/custom.validators';
import {Product} from '../../_models/product';

@Component({
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.scss']
})
export class AdminProductCreateComponent implements OnInit {
  @Input() productTypes;
  @Input() productCathegories;
  @Output() create = new EventEmitter<Product>();

  @ViewChild('expansion') expansion : MatExpansionPanel;

  photo = './assets/img/no-image.jpg';
  productUsages = [{name:"Salle"}, {name:"Éxterieur"}];
  myForm: FormGroup; 
  //Get error messages
  validation_messages = CustomValidators.getMessages();

  constructor(private adapter: DateAdapter<any>) { }
  //Create the form
  createForm() {
    this.myForm =  new FormGroup({    
      idGMA: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      serialNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),         
      brand: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])), 
      docLink: new FormControl('', Validators.compose([
        Validators.pattern('^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}')
      ])), 
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(50)
      ])), 
      cathegory: new FormControl('', Validators.compose([
        Validators.required
      ])),     
      type: new FormControl('', Validators.compose([
        Validators.required
      ])),     
      usage: new FormControl('', Validators.compose([
        Validators.required
      ])),      
      fabricatedOn: new FormControl('', Validators.compose([
        Validators.required
      ])),
      boughtOn: new FormControl('', Validators.compose([
        Validators.required
      ])),
      expiresOn: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  ngOnInit() {
    this.adapter.setLocale('fr');
    this.createForm();
  }
  //Update photo if we change it
  onImageChange(photo:string) {
    this.photo = photo;
  }

  //From submit
  onSubmit(value) {
    //Handle invalid form
    if (this.myForm.invalid) {
      return;
    }
    this.expansion.close();
    let result = new Product(value);
    result.image = this.photo;
    this.create.emit(result);
  }

}
