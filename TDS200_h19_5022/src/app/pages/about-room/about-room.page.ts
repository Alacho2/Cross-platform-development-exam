import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../../Types/General';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Platform} from '@ionic/angular';

const RENTED_TIME = 2;

@Component({
  selector: 'app-about-room',
  templateUrl: './about-room.page.html',
  styleUrls: ['./about-room.page.scss'],
})
export class AboutRoomPage implements OnInit {

  private room: Room;
  private readonly userInfo: string;
  public isiOS = this.platform.is('ios');


  constructor(private router: Router,
              private firestore: AngularFirestore,
              private auth: AngularFireAuth,
              private platform: Platform) {
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

    /*const updateInfo = {occupied: true, by: userInfo.email}; */

    // TODO(Håvard) Update the current time stamp in the database with 1 hour from now

    const rentedTo = new Date();
    rentedTo.setHours(rentedTo.getHours() + RENTED_TIME);

    const updateInfo = {rentedTo};


    return await this.firestore.collection<Room>("rooms")
      .doc(roomId)
      .update(updateInfo);

    // Your room is booked-message, then redirect home.
  }

  async navigateHome() {
    this.router.navigate(['tabs/home']);
  }
}
