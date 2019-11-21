import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Room} from '../../Types/General';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Platform} from '@ionic/angular';
import {displayToast} from '../../sharedContent';
import {getSyntheticPropertyName} from '@angular/compiler/src/render3/util';

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
  private collectionRef;


  constructor(private router: Router,
              private firestore: AngularFirestore,
              private auth: AngularFireAuth,
              private platform: Platform,
              private location: Location) {
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

    const rentedTo = new Date();
    rentedTo.setHours(rentedTo.getHours() + RENTED_TIME);

    const updateInfo = {rentedTo, renter: userInfo.email};

    try {
      this.firestore.collection<Room>("rooms")
        .doc(roomId)
        .update(updateInfo);
    } catch (exception) {
      displayToast("Something went terribly wrong when booking that room").then(toast =>
        toast.present()
      );
      return;
    }
    // Your room is booked-message, then redirect home.
    displayToast("The room is now booked for two hours. Thanks").then(toast =>
      toast.present()
    );

    this.navigateHome();
  }

  async navigateHome() {
    this.location.back();
  }
}
