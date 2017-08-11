import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../providers/User/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: User[];
 
  constructor(public navCtrl: NavController, private userService: UserServiceProvider) {
    userService.getUsers()
      .subscribe(users => {
        this.users = users;
      },
      err => console.log(err),
      () => {});
  }
 
}
