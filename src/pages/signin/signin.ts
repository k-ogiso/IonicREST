import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { AccountServiceProvider } from '../../providers/account-service';

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  user_id: string;
  password: string;
  rememberme: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountService: AccountServiceProvider
  ) {
    this.rememberme = true;
  }
  signup() {
    this.navCtrl.push(SignupPage);
  }
  login() {
    this.accountService.login({ user_id: this.user_id, password: this.password, rememberme: this.rememberme }).subscribe(
      (ret) => {
        if (ret) {
          this.navCtrl.push(HomePage);
        } else {
          this.password = '';
        }
      }
    );
  }
}
