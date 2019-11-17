import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../../Types/General';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-about-room',
  templateUrl: './about-room.page.html',
  styleUrls: ['./about-room.page.scss'],
})
export class AboutRoomPage implements OnInit {

  private room: Room;

  constructor(private router: Router, private firestore: AngularFirestore) {
    this.room = this.router.getCurrentNavigation().extras.state.room;
  }

  ngOnInit() {

  }

  async bookTheRoom(roomId: string) {
    return await this.firestore.collection<Room>("rooms").doc(roomId).update({occupied: true});

    // Your room is booked-message, then redirect home.
  }
}
