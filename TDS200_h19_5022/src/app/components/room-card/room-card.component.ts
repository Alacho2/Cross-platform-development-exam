import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../Types/General';

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
    console.log(this.room);
  }

}
