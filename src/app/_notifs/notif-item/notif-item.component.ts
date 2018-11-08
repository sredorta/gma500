import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Notif} from '../../_models/notif';

@Component({
  selector: 'app-notif-item',
  templateUrl: './notif-item.component.html',
  styleUrls: ['./notif-item.component.scss']
})
export class NotifItemComponent implements OnInit {
  @Input() notif : Notif;
  @Output() markAsRead = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  _markAsRead() {
    this.markAsRead.emit(this.notif.id);
  }

  _delete() {
    this.delete.emit(this.notif.id);

  }
}
