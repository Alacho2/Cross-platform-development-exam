import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RoomInfo } from '../../Types/General';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuid } from 'uuid';
import { displayToast } from '../../sharedContent';
import * as moment from 'moment';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {

  private cameraPreview = '';
  private imageBase = '';
  private currTime = '';
  private position: Geoposition;
  private roomInfo: RoomInfo = {
    title: '',
    landlord: '',
    description: '',
    creationDate: '',
    // startTime: '',
    // endTime: '',
    size: 0,
  };

  constructor(
    private modalController: ModalController,
    private camera: Camera,
    private auth: AngularFireAuth,
    private fireStorage: AngularFireStorage,
    private fireStore: AngularFirestore,
    private location: Geolocation
  ) {
    this.roomInfo.landlord = this.auth.auth.currentUser.email;
    this.currTime = moment().format();
    // this.roomInfo.endTime = moment().add(1, 'hours').format();
    // this.roomInfo.startTime = moment().format();
  }

  async ngOnInit() {
    this.takePicture();
    this.position = await this.location.getCurrentPosition();
  }

  dismissModal(): void {
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
      displayToast("We can't get the camera without Cordova").then(
        toast => toast.present()
      );
      console.log(e);
    }
  }

  async uploadImageToFirestorage(): Promise<string> {
    const fileName = `tds-${uuid()}.png`;
    const firestorageFileRef = this.fireStorage.ref(fileName);
    const uploadTask = firestorageFileRef.putString(this.imageBase, 'base64', { contentType: 'image/png' });
    await uploadTask.then();
    return firestorageFileRef.getDownloadURL().toPromise();
  }

  async upload(): Promise<void> {
    const image = await this.uploadImageToFirestorage();
    const { landlord, description, size, title } = this.roomInfo;

    if (description.length < 10 || size < 10 || !title.length) {
      displayToast("Make sure to add title, description, and size").then(toast =>
        toast.present()
      );
      return;
    }

    if (description.length > 250 || title.length > 50) {
      displayToast("Keep descriptions (250) and titles (50) short").then(toast =>
        toast.present()
      );
      return;
    }

    const { latitude, longitude } = this.position.coords;

    const creationDate = new Date();

    this.fireStore.collection('rooms').add({
      title,
      landlord,
      description,
      size,
      latitude,
      longitude,
      image,
      rentedTo: creationDate,
      creationDate,
    });

    this.dismissModal();

    // console.log(this.roomInfo);
  }
}
