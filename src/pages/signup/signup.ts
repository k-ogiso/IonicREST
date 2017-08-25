import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AccountServiceProvider } from '../../providers/account-service';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user_id: string;
  password: string;
  password_v: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountService: AccountServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signup() {
    if (this.password === this.password_v) {
      this.accountService.signup({ user_id: this.user_id, password: this.password }).subscribe(
        (ret) => {
          if (ret) {
            this.navCtrl.push(HomePage);
          } else {
            this.user_id = '';
            this.password = '';
          }
        }
      );
    }
  }
}
