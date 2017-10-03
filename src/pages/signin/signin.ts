import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { AccountServiceProvider } from '../../providers/account-service';
import { AlertController } from 'ionic-angular';

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
  @ViewChild("it")
  it: any;
  user_id: string;
  password: string;
  rememberme: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountService: AccountServiceProvider,
    public alertCtrl: AlertController,
    public ga: GoogleAnalytics,
  ) {
    this.rememberme = true;
  }
  ionViewDidLoad() {
    setTimeout(() => { this.it.setFocus() }, 500);
  }
  ionViewDidEnter() {
    this.ga.trackView('signin').then(() => { console.log('GoogleAnalytics OK') });
  }
  signup() {
    this.navCtrl.push(SignupPage);
  }
  login() {
    this.accountService.login({
      user_id: this.user_id,
      password: this.password,
      rememberme: this.rememberme
    }).subscribe(
      ret => {
        if (ret) {
          this.navCtrl.setRoot(HomePage);
        } else {
          this.password = '';
          let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: 'Invalid ID or Password!',
            buttons: ['Close']
          });
          alert.present();
        }
      },
      error => {
        let alert = this.alertCtrl.create({
          title: 'error',
          subTitle: 'Network Error!',
          buttons: ['Close']
        });
        alert.present();
      }
      );
  }
}
