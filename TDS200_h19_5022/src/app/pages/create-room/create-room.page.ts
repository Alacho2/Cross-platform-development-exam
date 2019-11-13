import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RoomInfo } from '../../Types/General';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuid } from 'uuid';
import displayToast from '../../sharedContent';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {

  private cameraPreview = '';
  private imageBase = '';
  private roomInfo: RoomInfo = {
    landlord: "",
    description: "",
    size: 0,
  };

  constructor(
    private modalController: ModalController,
    private camera: Camera,
    private auth: AngularFireAuth,
    private fireStorage: AngularFireStorage,
    private fireStore: AngularFirestore
  ) {
    this.roomInfo.landlord = this.auth.auth.currentUser.email;
  }

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

  async uploadImageToFirestorage() {
    const fileName = `tds-${uuid()}.png`;
    const firestorageFileRef = this.fireStorage.ref(fileName);
    const uploadTask = firestorageFileRef.putString(this.imageBase, 'base64', { contentType: 'image/png' });
    await uploadTask.then();
    return firestorageFileRef.getDownloadURL().toPromise();
  }

  async upload() {
    const imageRef = await this.uploadImageToFirestorage();
    const { landlord, description, size } = this.roomInfo;

    if (description.length < 10 || size < 10) {
      displayToast("Make sure to add a description or size").then(toast =>
        toast.present()
      );
      return;
    }

    this.fireStore.collection('rooms').add({
      landlord,
      description,
      size,
      image: imageRef,
    });

    // console.log(this.roomInfo);
  }
}
