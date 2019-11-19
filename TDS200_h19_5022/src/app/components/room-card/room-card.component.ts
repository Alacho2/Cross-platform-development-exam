import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../Types/General';
import { stripEmailFromLandlord } from '../../sharedContent';

import * as moment from 'moment';
import {Timestamp} from 'rxjs';

@Component({
  selector: 'room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {

  @Input()
  room: Room;

  constructor() { }

  ngOnInit() {
    // console.log(this.room);
  }

  stripTheEmailPart(email: string): string {
    return stripEmailFromLandlord(email);
  }

  // Rxjs brings back Timestamp<T>.
  // I'll honestly say I have no idea how to dael with it
  convertToTimeFromNow(date: any): string {
    return moment.unix(date.seconds).fromNow();
  }

  someFunc(event) {
    // Block firing of moving
    event.stopPropagation();
  }
}
