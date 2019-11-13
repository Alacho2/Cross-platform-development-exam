import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateRoomPage } from '../create-room/create-room.page';
import { ModalOptions } from '@ionic/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Room } from '../../Types/General';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private rooms$: Observable<Room[]>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {

    // Make sure we trigger a rerender if logged in
    this.auth.authState.subscribe(() => {});

  }

  ngOnInit(): void {
    const collectionRef = this.firestore.collection<Room>('rooms');
    this.rooms$ = collectionRef.valueChanges({idField: 'id'}) as Observable<Room[]>;

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
}
