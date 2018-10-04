import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  myClass : string;

  constructor() { }
  //Inputs
  @Input() message : string;
  @Input() type : string;
  @Input() visible : boolean;

  ngOnInit() {}
  setClasses() {
    return {
      "http-message-wrapper" : true,
      "http-message-visible": this.visible,
      "http-alert-message": this.type == "error"?true:false,
      "http-success-message": this.type == "success"?true:false,
    }
  }
}
