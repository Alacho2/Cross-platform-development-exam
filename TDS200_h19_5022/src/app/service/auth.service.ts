import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../Types/General';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private fireauth: AngularFireAuth) { }

  async loginUser(user: User) {
    return await this.fireauth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  async registerUser(user: User) {
    return await this.fireauth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  async logoutUser() {
    return await this.fireauth.auth.signOut();
  }
}

