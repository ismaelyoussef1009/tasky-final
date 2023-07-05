import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../interfaces/user.interface';
import { UserService } from '../services/users.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss',]
})
export class SignInComponent {

  constructor( private checkStore: UserService, private route:Router){

  }

  User: Iuser = {
    username: '',
    password: '',
    email:""
  }

  submit(e:any,user:Iuser){
    this.checkStore.signIn(user);
  }
  
  googleAuth(e:any){
    this.checkStore.google()
  }
  facebookSignIn(e:any){
    this.checkStore.facebook()
  }
}
