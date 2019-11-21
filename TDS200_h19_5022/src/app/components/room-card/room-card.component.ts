import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../Types/General';
import { stripEmailFromLandlord } from '../../sharedContent';

import * as moment from 'moment';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

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

  convertToTimeFromNow(date: any): string {
    return moment.unix(date.seconds).fromNow();
  }

  someFunc(event) {
    // Block firing of moving
    event.stopPropagation();
  }
}
