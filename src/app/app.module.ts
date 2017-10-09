import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { DecimalPipe, DatePipe } from '@angular/common';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Facebook } from '@ionic-native/facebook';
// import { FacebookModule } from 'ngx-facebook';

import { MyApp } from './app.component';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TaskServiceProvider } from '../providers/task-service';
import { AccountServiceProvider } from '../providers/account-service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    SignupPage,
    HomePage,
    AddPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    NgbModule.forRoot(),
    // FacebookModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    SignupPage,
    HomePage,
    AddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatePipe, DecimalPipe,
    TaskServiceProvider,
    AccountServiceProvider,
    GoogleAnalytics,
    Facebook,
  ]
})
export class AppModule { }
