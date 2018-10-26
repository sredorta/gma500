import { Component, OnInit, Input } from '@angular/core';
import {Notif} from '../../_models/notif';

@Component({
  selector: 'app-notif-item',
  templateUrl: './notif-item.component.html',
  styleUrls: ['./notif-item.component.scss']
})
export class NotifItemComponent implements OnInit {
  @Input() notif : Notif;
  constructor() { }

  ngOnInit() {
  }

}
