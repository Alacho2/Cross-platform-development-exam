/// <reference types="@types/googlemaps" />

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Room} from '../../Types/General';
import {stripEmailFromLandlord} from '../../sharedContent';

import * as moment from 'moment';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import TravelMode = google.maps.TravelMode;
import DistanceMatrixResponseElement = google.maps.DistanceMatrixResponseElement;

@Component({
  selector: 'room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {

  @Input()
  room: Room;

  @Input()
  userPosition: Geoposition;

  data: string;


  constructor() { }

  ngOnInit() {

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
