import { Component, OnInit } from '@angular/core';
import { User } from '../../Types/General';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { displayToast } from '../../sharedContent';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  private isLogin = true;
  private title = "Login";
  private user: User = {
    email: "",
    password: "",
  };
  public isiOS = this.platform.is('ios');

  constructor(
    private authService: AuthService,
    private router: Router,
    private platform: Platform,
  ) { }

  ngOnInit() { }

  useRegister() {
    if (this.isLogin) {
      this.isLogin = false;
      this.title = "Register";
    } else {
      this.isLogin = true;
      this.title = "Login";
    }
  }

  // Param: Make sure we only allow using this function if
  // we pass login or register, to correctly handle the data.
  async attemptLoginOrRegister(which: "login" | "register") {
    const {email, password} = this.user;

    if (email.length === 0 || password.length === 0) {
      displayToast("You need a username or password").then(toast =>
        toast.present()
      );
      return;
    }
    if (which === "login") {
      try {
        const result = await this.authService.loginUser(this.user);
        this.router.navigate(['tabs/home']);
      } catch (exception) {
        displayToast("Wrong username or password").then(toast =>
          toast.present()
        );

        console.warn(exception);
      }

    } else if (which === "register") {
      try {
        const result = await this.authService.registerUser(this.user);
        this.router.navigate(['tabs/home']);
      } catch (exception) {
        displayToast("Wrong username or password").then(toast =>
          toast.present()
        );

        console.warn(exception);
      }
    }
  }

}
