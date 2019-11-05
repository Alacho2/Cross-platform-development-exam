import { Component, OnInit } from '@angular/core';
import User from '../../service/Types';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {ToastController} from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private isLogin = true;
  private title = "Login";
  private user: User = {email: "", password: ""};

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    console.log("You're in log in");
  }

  useRegister() {
    if (this.isLogin) {
      this.isLogin = false;
      this.title = "Register";
    } else {
      this.isLogin = true;
      this.title = "Login";
    }
  }


  async attemptLoginOrRegister(which: "login" | "register") {
    const {email, password} = this.user;

    if (email.length === 0 && password.length === 0) {
      this.displayToast("You need a username or password")
        .then(toast => toast.present());
      return;
    }
    if (which === "login") {
      try {
        const result = await this.authService.loginUser(this.user);
        this.router.navigate(['tabs/home']);
      } catch (exception) {
        this.displayToast("Wrong username or password")
          .then(toast => toast.present());
        console.warn(exception);
      }

    } else if (which === "register") {
      try {
        const result = await this.authService.registerUser(this.user);
        this.router.navigate(['tabs/home']);
      } catch (exception) {
        this.displayToast("Wrong username or password")
          .then(toast => toast.present());
        console.warn(exception);
      }
    }
  }

  displayToast(message: string) {
    const toastOptions: ToastOptions = {
      message,
      duration: 1500,
      position: 'bottom'
    };

    return this.toastCtrl.create(toastOptions);
  }

}
