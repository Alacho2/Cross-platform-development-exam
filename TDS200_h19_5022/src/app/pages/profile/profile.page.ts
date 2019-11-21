import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from '../../Types/General';
import { Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import {getUsersDistanceToRoom} from '../../sharedContent';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public isiOS = this.platform.is('ios');
  private ownedRooms: Room[] = [];
  private rentedRooms: Room[] = [];
  private position: Geoposition;

  constructor(
    private platform: Platform,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private location: Geolocation
  ) { }

  async ngOnInit() {

    this.position = await this.getLocation();

    const userEmail = this.auth.auth.currentUser.email;
    const date = parseInt((new Date().getTime() / 1000).toFixed(0), 10);

    // Get rooms sort on newest to oldest.
    const collectionRef = this.firestore.collection<Room>('rooms',
      ref =>
        ref
          .orderBy('creationDate', 'desc')
    );

    // Theoretically, we should have been able to poke this with a pipe()
    // We get all the rooms and the id and assign the value to what the user ownes
    // and what the user is renting.
    const ownedFirebaseRooms$ = collectionRef.valueChanges({idField: 'id'}) as Observable<Room[]>;
    ownedFirebaseRooms$.subscribe(rooms => {

      rooms.forEach(async room => {
        room.distanceToRoom = await getUsersDistanceToRoom(this.position, room.latitude, room.longitude);
      });

      this.ownedRooms = rooms.filter(room => {
        return room.landlord === userEmail;
      });

      this.rentedRooms = rooms.filter(room => {
        return room.renter === userEmail && room.rentedTo.seconds > date;
      });
    });
  }

  async getLocation() {
    return await this.location.getCurrentPosition();
  }

  trackFunc(index, item): string {
    // console.log(item, index);
    return item.id;
  }

  getRoomsForRentLength(): number {
    return this.ownedRooms.length;
  }

  getRoomsRentedLength(): number {
    return this.rentedRooms.length;
  }

  async navigateToRoomInfo(room: Room) {
    const navExtra: NavigationExtras = {
      state: {
        room,
      }
    };
    this.router.navigate(['about'], navExtra);
  }

}
