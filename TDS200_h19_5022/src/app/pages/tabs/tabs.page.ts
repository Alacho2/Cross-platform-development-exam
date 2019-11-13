import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  private youOrLogin = "Login";

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(state => {
      this.youOrLogin = state === null ? 'Login' : 'You';
    });
  }

  ngOnInit() {
  }

}
