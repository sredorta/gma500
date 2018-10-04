import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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
