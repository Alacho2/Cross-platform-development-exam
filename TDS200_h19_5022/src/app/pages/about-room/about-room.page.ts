import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-about-room',
  templateUrl: './about-room.page.html',
  styleUrls: ['./about-room.page.scss'],
})
export class AboutRoomPage implements OnInit {

  constructor(private router: Router) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit() {
  }

}
