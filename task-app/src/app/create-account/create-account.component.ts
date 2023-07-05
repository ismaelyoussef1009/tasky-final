import { Component } from '@angular/core';
import { Iuser } from '../interfaces/user.interface';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  constructor(private users: UserService) { }

  User: Iuser= {
    username: '',
    email:"",
    password: '',
  }

  submit(e:any,user:Iuser){
    this.users.signUp(user);
  }

}
