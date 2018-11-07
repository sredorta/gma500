import { Component, OnInit, Input } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
//Import all shared logic required for forms handling
import {CustomValidators, ParentErrorStateMatcher  } from '../../_helpers/custom.validators';


@Component({
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.scss']
})
export class AdminProductCreateComponent implements OnInit {
  @Input() productTypes;
  @Input() productCathegories;

  photo = './assets/img/no-image.jpg';
  productUsages = [{name:"Salle"}, {name:"Éxterieur"}];
  myForm: FormGroup; 
  //Get error messages
  validation_messages = CustomValidators.getMessages();

  constructor() { }
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
    this.createForm();
  }
  //Update photo if we change it
  onImageChange(photo:string) {
    this.photo = photo;
  }
}
