import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Iuser } from '../interfaces/user.interface';
AuthenticationService;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authservice: AuthenticationService
  ) {}

  signUp(User: Iuser) {
    this.authservice.signUp(User);
  }

  signIn(User: Iuser) {
    this.authservice.signIn(User);
  }
  google() {
    this.authservice.googleSignIn();
  }
  facebook() {
    this.authservice.facebookSignIn();
  }
}
