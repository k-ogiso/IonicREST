import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatePipe } from '@angular/common'

import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { TaskServiceProvider } from '../../providers/task-service';
import { Utils } from '../../utils/utils';
import { Const } from '../../utils/const';
import { Task } from '../../model/task';
import { AddPage } from '../add/add';
import { AlertController } from 'ionic-angular';
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('viewhide', [
      transition('void => *', [
        style({
          opacity: 0,
          height: 0,
          // transform: 'translateY(-30%)'
        }),
        animate('0.3s ease')
      ]),
      transition('* => void', [
        animate('0.3s ease', style({
          opacity: 0,
          height: 0,
          // transform: 'translateY(-30%)'
        }))
      ]),
    ]),
  ],
})
export class HomePage {

  currentDate;
  currentDateYmd: string;
  tasks: Task[];
  tglFlg: boolean;
  pastFlg: boolean;
  month: string;
  month2: string;
  day: string;
  year: string;

  filt = (rec: Task): boolean => {
    const end_date_ymd = this.endDateToYmd(rec.end_date);
    const cur_date_ymd = this.currentDateYmd;
    if ((!this.tglFlg && rec.status !== 0) || (this.pastFlg && cur_date_ymd > end_date_ymd)) {
      return false;
    } else {
      return true;
    }
  }
  upd = tasks => {
    // 全体リフレッシュするか一部リフレッシュかの判定（アニメーションの感じに関わるところ）
    const befMap: { [key: number]: Task } = {};
    const aftMap: { [key: number]: Task } = {};
    const sabun = this.tasks.length - tasks.length;
    tasks.forEach(elem => befMap[elem.task_id] = elem);
    this.tasks.forEach(elem => aftMap[elem.task_id] = elem);
    if (sabun < 0) {
      for (let idx = 0; idx < -sabun; idx++) {
        this.tasks.push(new Task());
      }
    } else if (sabun > 0) {
      this.tasks.splice(tasks.length, sabun);
    } else {
    }

    for (let idx = 0; idx < tasks.length; idx++) {
      if (this.tasks[idx].status !== tasks[idx].status) {
        this.tasks[idx] = tasks[idx];
      } else {
        Utils.map(tasks[idx], this.tasks[idx]);
      }
    }
  };

  errorFunc = error => {
    this.alertCtrl.create({
      title: 'error',
      subTitle: 'Network Error!',
      buttons: ['Close']
    }).present();
  };

  constructor(
    public navCtrl: NavController,
    private taskService: TaskServiceProvider,
    public alertCtrl: AlertController,
    private datePipe: DatePipe,
    public ga: GoogleAnalytics,
  ) {
    this.currentDate = new Date();
    this.day = String(this.currentDate.getDate());
    this.month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][this.currentDate.getMonth()];
    this.month2 = String(this.currentDate.getMonth() + 1);
    this.year = String(this.currentDate.getFullYear());
    this.tasks = [];
    this.tglFlg = false;
    this.pastFlg = true;
    const m = (this.month2.length === 1 ? "0" : "") + this.month2;
    const d = (this.day.length === 1 ? "0" : "") + this.day;
    this.currentDateYmd = this.currentDate.getFullYear() + "-" + m + "-" + d
  }
  ionViewDidEnter() {
    this.taskService.getTasks().subscribe(this.upd, this.errorFunc);
    this.ga.trackView('home').then(() => { console.log('GoogleAnalytics OK') });
  }
  endDateToYmd(end_date: string): string {
    return end_date.split(" ")[0];
  }
  isToday(task: Task) {
    return this.endDateToYmd(task.end_date) === this.currentDateYmd;
  }
  goToAddPage() {
    this.navCtrl.push(AddPage);
  }
  getPastTasks() {
    this.pastFlg = !this.pastFlg;
    this.ga.trackEvent(Const.GA_EVENT_EDIT_TASK, (this.pastFlg ? 'show' : 'hide') + 'Past').then(() => { console.log('GoogleAnalytics OK') });
  }
  includeDone() {
    this.tglFlg = !this.tglFlg;
    this.ga.trackEvent(Const.GA_EVENT_EDIT_TASK, (this.pastFlg ? 'show' : 'hide') + 'Done').then(() => { console.log('GoogleAnalytics OK') });
  }
  updateStatus(task, status) {
    if (task.status !== status) {
      this.taskService.updTask(task.task_id, status).subscribe(() => {
        const uiName = { 1: 'done', '-1': 'delete' };
        this.ga.trackEvent(Const.GA_EVENT_EDIT_TASK, uiName[status]).then(() => { console.log('GoogleAnalytics OK') });
        this.taskService.getTasks().subscribe(this.upd, this.errorFunc);
      }, this.errorFunc);
    } else {
    }
  }
  resche(task: Task) {
    let endDate: Date;
    if (this.endDateToYmd(task.end_date) < this.currentDateYmd) {
      endDate = new Date();
    } else {
      endDate = new Date(new Date(task.end_date).getTime() + 1 * 24 * 60 * 60 * 1000);
    }
    const m = ((endDate.getMonth() + 1) > 9 ? '' : '0') + (endDate.getMonth() + 1);
    const d = (endDate.getDate() > 9 ? '' : '0') + endDate.getDate();
    const sTask = Utils.map(task, new Task()) as Task;
    sTask.end_date = endDate.getFullYear() + "-" + m + "-" + d;
    sTask.status = 0;
    this.taskService.edtTask(sTask).subscribe(() => {
      this.ga.trackEvent(Const.GA_EVENT_EDIT_TASK, task.status === 0 ? 'carry' : 'todo').then(() => { console.log('GoogleAnalytics OK') });
      this.taskService.getTasks().subscribe(this.upd, this.errorFunc);
    }, this.errorFunc)
  }
  showAlert(task: Task) {
    let alert = this.alertCtrl.create({
      title: this.datePipe.transform(task.end_date, 'y/M/d(EEE)'),
      subTitle: task.item,
      buttons: [
        {
          text: 'Edit', handler: () => {
            this.ga.trackEvent(Const.GA_EVENT_EDIT_TASK, 'edit').then(() => { console.log('GoogleAnalytics OK') });
            this.navCtrl.push(AddPage, { target: task });
          }
        },
        {
          text: 'Close', handler: () => {
            this.ga.trackEvent(Const.GA_EVENT_EDIT_TASK, 'closeDetail').then(() => { console.log('GoogleAnalytics OK') });
          }
        }]
    });
    alert.present();
    this.ga.trackEvent(Const.GA_EVENT_EDIT_TASK, 'showDetail').then(() => { console.log('GoogleAnalytics OK') });
  }
}