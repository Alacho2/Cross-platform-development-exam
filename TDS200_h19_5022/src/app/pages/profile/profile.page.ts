import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Room} from '../../Types/General';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public isiOS = this.platform.is('ios');
  private rooms: Room[];

  constructor(
    private platform: Platform,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {

    // Get rooms based on the rentedTo value being smaller than a minute from now
    // Sort on rentedTo, then on creationDate.
    // a minute from now, because we wanna make sure that new rooms appear
    const collectionRef = this.firestore.collection<Room>('rooms',
      ref =>
        ref
          .where('landlord', '==', this.auth.auth.currentUser.email)
    );
    const firebaseRooms$ = collectionRef.valueChanges({idField: 'id'}) as Observable<Room[]>;
    firebaseRooms$.subscribe(rooms => {
      this.rooms = rooms;
      console.log(rooms);
    });
  }

}
