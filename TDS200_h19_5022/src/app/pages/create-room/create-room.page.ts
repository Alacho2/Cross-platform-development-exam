import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {

  }

  dismissModal() {
    try {
      this.modalController.dismiss();
    } catch (exception) {
      console.log(exception);
    }
  }




}
