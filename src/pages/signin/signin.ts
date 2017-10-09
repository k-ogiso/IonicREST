import { Component, ViewChild } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { Const } from '../../utils/const';
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
  title = 'SignIn';
  @ViewChild("it")
  it: any;
  user_id: string;
  password: string;
  rememberme: boolean;
  sts: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountService: AccountServiceProvider,
    public alertCtrl: AlertController,
    public ga: GoogleAnalytics,
    public app: App,
    public fb: Facebook,
  ) {
    this.rememberme = true;
  }
  ionViewDidLoad() {
    setTimeout(() => { this.it.setFocus() }, 500);
  }
  ionViewDidEnter() {
    this.app.setTitle(`${Const.APP_TITLE} ${this.title}`);
    this.ga.trackView(this.title);
  }
  facebookLogin() {
    this.fb.login(['public_profile,email'])
      .then((res: FacebookLoginResponse) => {
        // alert('then:' + res.status);
        if (res.status === 'connected') {
          this.accountService.facebookLogin({
            accessToken: res.authResponse.accessToken,
          }).subscribe(ret => {
            this.navCtrl.setRoot(HomePage);
          });
        } else {
        }
      })
      .catch(res => {
        alert('Error:' + res);
      });
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
