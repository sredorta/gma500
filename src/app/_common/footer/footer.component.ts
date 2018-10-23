import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  email : String = environment.EMAIL_CONTACT;
  address1 : String = environment.ADDRESS1;
  address2 : String = environment.ADDRESS2;
  address3 : String = environment.ADDRESS3;
  constructor() { }

  ngOnInit() {
  }
  redirectToFacebook() {
    window.location.href='https://www.facebook.com/gma500/';  
  }
  redirectToContact() {
    //TODO

  }  
}
