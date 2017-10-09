import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Facebook } from '@ionic-native/facebook';
// import { FacebookService, InitParams } from 'ngx-facebook';

import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AccountServiceProvider } from '../providers/account-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  loadFlg: boolean;
  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public accountService: AccountServiceProvider,
    public ga: GoogleAnalytics,
    public fb: Facebook,
  ) {
    this.initializeApp();
    this.loadFlg = false;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Signin', component: SigninPage },
      { title: 'Signup', component: SignupPage },
      { title: 'Home', component: HomePage },
      { title: 'Add', component: AddPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // Google Analystics
      this.ga.startTrackerWithId('UA-107372795-1')
        .then(() => {
          console.log('Google analytics is ready now');
          //the component is ready and you can call any method here
          // this.ga.debugMode();
          this.ga.setAllowIDFACollection(true);
          this.fblogin();
        })
        .catch(e => {
          console.log('Error starting GoogleAnalytics', e);
          this.fblogin();
        });
    });
  }
  fblogin(): void {
    this.fb.getLoginStatus()
      .then(res => {
        // ログイン済みセッションの場合はいきなりHomeに行く
        this.rootPage = res.status === 'connected' ? HomePage : SigninPage;
        this.loadFlg = true;
      })
      .catch(res => {
        alert('catch:' + res.status);
        this.loaded();
      });
  }
  loaded(): void {
    this.accountService.getLogin().subscribe(
      ret => {
        // ログイン済みセッションの場合はいきなりHomeに行く
        this.rootPage = ret ? HomePage : SigninPage;
        this.loadFlg = true;
      },
      error => {
        this.rootPage = SigninPage;
        this.loadFlg = true;
      }
    );
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
