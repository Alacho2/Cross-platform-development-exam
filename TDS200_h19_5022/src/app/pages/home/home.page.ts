import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {NavigationExtras, Router} from '@angular/router';
import {ModalController, NavController, Platform } from '@ionic/angular';
import { CreateRoomPage } from '../create-room/create-room.page';
import { ModalOptions } from '@ionic/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {Room, RoomInfo} from '../../Types/General';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private rooms: Room[];
  private collectionRef;
  public isiOS = this.platform.is('ios');

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private platform: Platform,
  ) {

    // Make sure we trigger a rerender if logged in
    this.auth.authState.subscribe(() => {});

  }

  ngOnInit(): void {
    this.setUpUnoccupiedRoomsAndOrderByDate();
  }

  setUpUnoccupiedRoomsAndOrderByDate() {
    this.collectionRef = this.firestore.collection<Room>('rooms',
      ref =>
        ref
          .where('occupied', '==', false)
          .orderBy('creationDate', 'desc')
    );
    const firebaseRooms$ = this.collectionRef.valueChanges({idField: 'id'}) as Observable<Room[]>;
    firebaseRooms$.subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  isNotSignedIn() {
    return this.auth.auth.currentUser === null;
  }

  async attemptSignOut() {
    try {
      await this.authService.logoutUser();
    } catch (exception) {
      console.log(exception);
    }
  }

  async addRoom() {
    const mcOpts: ModalOptions = {
      component: CreateRoomPage,
      animated: true,
    };
    const modal = await this.modalController.create(mcOpts);
    await modal.present();
  }

  trackFunc(index, item) {
    // console.log(item, index);
    return item.id;
  }

  async navigateToRoomInfo(room: Room) {
    const navExtra: NavigationExtras = {
      state: {
        room
      }
    };
    this.router.navigate(['about'], navExtra);
  }
}

