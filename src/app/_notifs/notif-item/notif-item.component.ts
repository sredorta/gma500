import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notif-item',
  templateUrl: './notif-item.component.html',
  styleUrls: ['./notif-item.component.scss']
})
export class NotifItemComponent implements OnInit {
  @Input() id : number;
  @Input() text : string;
  @Input() isRead : boolean;
  @Output() markAsRead = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  private _markAsRead() {
    this.markAsRead.emit(this.id);
  }

  private _delete() {
    this.delete.emit(this.id);

  }
}
