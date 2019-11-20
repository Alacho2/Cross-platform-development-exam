import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { CreateRoomPage } from '../create-room/create-room.page';
import { ModalOptions } from '@ionic/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Room } from '../../Types/General';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {

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

  ngOnChanges(changes: SimpleChanges): void {
    console.warn(changes);
  }


  setUpUnoccupiedRoomsAndOrderByDate(): void {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1 );

    // Get rooms based on the rentedTo value being smaller than a minute from now
    // Sort on rentedTo, then on creationDate.
    // a minute from now, because we wanna make sure that new rooms appear
    this.collectionRef = this.firestore.collection<Room>('rooms',
      ref =>
        ref
          .where('rentedTo', '<=', new Date(now))
          .orderBy('rentedTo', 'desc')
          .orderBy('creationDate', 'desc')
    );
    const firebaseRooms$ = this.collectionRef.valueChanges({idField: 'id'}) as Observable<Room[]>;
    firebaseRooms$.subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  isNotSignedIn(): boolean {
    return this.auth.auth.currentUser === null;
  }

  async attemptSignOut(): Promise<void> {
    try {
      await this.authService.logoutUser();
    } catch (exception) {
      console.log(exception);
    }
  }

  async addRoom(): Promise<void> {
    const mcOpts: ModalOptions = {
      component: CreateRoomPage,
      animated: true,
    };
    const modal = await this.modalController.create(mcOpts);
    await modal.present();
  }

  trackFunc(index, item): string {
    // console.log(item, index);
    return item.id;
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

