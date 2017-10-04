import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { HomePage } from '../home/home';
import { AccountServiceProvider } from '../../providers/account-service';
import { AlertController } from 'ionic-angular';

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
    public accountService: AccountServiceProvider,
    public alertCtrl: AlertController,
    public ga: GoogleAnalytics,
  ) {
  }
  ionViewDidEnter() {
    this.ga.trackView('signup');
  }
  signup() {
    if (this.password === this.password_v) {
      let mess = '';
      if (3 <= this.user_id.length && this.user_id.length <= 30) {
      } else {
        mess += 'ID length must be 3 to 30\n';
      }
      if (8 <= this.password.length && this.password.length <= 30) {
      } else {
        mess += 'Password length must be 8 to 30';
      }
      if (mess.length > 0) {
        let alert = this.alertCtrl.create({
          title: 'error',
          subTitle: mess,
          buttons: ['Close']
        });
        alert.present();
      } else {
        this.accountService.signup({
          user_id: this.user_id,
          password: this.password
        }).subscribe(
          ret => {
            if (ret) {
              this.navCtrl.setRoot(HomePage);
            } else {
              let alert = this.alertCtrl.create({
                title: 'error',
                subTitle: 'This ID is already exists!',
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
          });
      }
    } else {
      this.password_v = '';
      let alert = this.alertCtrl.create({
        title: 'error',
        subTitle: 'Password miss match!',
        buttons: ['Close']
      });
      alert.present();
    }
  }
}
