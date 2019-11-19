import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../../Types/General';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-about-room',
  templateUrl: './about-room.page.html',
  styleUrls: ['./about-room.page.scss'],
})
export class AboutRoomPage implements OnInit {

  private room: Room;
  private readonly userInfo: string;

  constructor(private router: Router,
              private firestore: AngularFirestore,
              private auth: AngularFireAuth) {
    this.room = this.router.getCurrentNavigation().extras.state.room;
    this.userInfo = this.router.getCurrentNavigation().extras.state.user;
  }

  ngOnInit() {

  }

  async bookTheRoom(roomId: string): Promise<void> {
    // User can't book if they're not signed in
    const userInfo = this.auth.auth.currentUser;
    if (userInfo === null) {
      this.router.navigate(['tabs/login']);
      return;
    }

    const updateInfo = {occupied: true, by: userInfo.email};

    return await this.firestore.collection<Room>("rooms")
      .doc(roomId)
      .update(updateInfo);

    // Your room is booked-message, then redirect home.
  }
}
