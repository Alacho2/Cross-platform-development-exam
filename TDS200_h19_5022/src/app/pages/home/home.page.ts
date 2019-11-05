import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    console.info(this.authService.getUserData());
  }

  async attemptSignOut() {
    try {
      await this.authService.logoutUser();
    } catch (exception) {
      console.log(exception);
    }
  }
}
