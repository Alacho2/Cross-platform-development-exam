import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public isiOS = this.platform.is('ios');

  constructor(private platform: Platform) { }

  ngOnInit() {
  }

}
