import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

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
    public navParams: NavParams
  ) {
  }
  signup() {
    this.navCtrl.push(SignupPage);
  }
}
