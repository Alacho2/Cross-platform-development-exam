import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {

  private cameraPreview = '';
  private imageBase = '';
  private pictureDesc = '';

  constructor(
    private modalController: ModalController,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.takePicture();
  }

  dismissModal() {
    try {
      this.modalController.dismiss();
    } catch (exception) {
      console.log(exception);
    }
  }

  async takePicture() {

    const cameraOptions: CameraOptions = {
      allowEdit: true,
      quality: 100,
      saveToPhotoAlbum: true,
    };

    try {
      const imageData = await this.camera.getPicture(cameraOptions);
      this.cameraPreview = 'data:image/jpeg;base64,' + imageData;
      this.imageBase = imageData;
    } catch (e) {
      console.log(e);
    }
  }



}
