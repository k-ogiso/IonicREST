import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaskServiceProvider } from '../../providers/task-service';
import { Task } from '../../model/task';
import { DatePipe } from '@angular/common'
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

  currentDate = new Date();
  currentDateYmd: string;
  tasks: Task[];
  tglFlg: boolean;
  pastFlg: boolean;
  month: string;
  month2: string;
  day: string;
  year: string;
  counter: number = 0;

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
    let refreshFlg = tasks.length !== this.tasks.length;
    if (refreshFlg) {
    } else {
      for (let idx = 0; idx < tasks.length; idx++) {
        if (tasks[idx].task_id === this.tasks[idx].task_id) {
          if (this.tasks[idx].status !== tasks[idx].status) {
            this.tasks[idx] = tasks[idx];
          }
        } else {
          refreshFlg = true;
          break;
        }
      }
    }
    if (refreshFlg) {
      this.tasks = tasks;
    } else {
    }
  };

  constructor(
    public navCtrl: NavController,
    private taskService: TaskServiceProvider,
    public alertCtrl: AlertController,
    private datePipe: DatePipe
  ) {
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
    this.taskService.getTasks().subscribe(this.upd);
  }
  endDateToYmd(end_date: string): string {
    return end_date.split(" ")[0];
  }
  isToday(task: Task) {
    return this.endDateToYmd(task.end_date) === this.currentDateYmd;
  }
  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe();
  }
  delTask(task_id: number): void {
    this.taskService.delTask(task_id).subscribe();
  }
  goToAddPage() {
    this.navCtrl.push(AddPage);
  }
  getPastTasks() {
    this.pastFlg = !this.pastFlg;
  }
  updateStatus(task, status) {
    if (task.status !== status) {
      this.taskService.updTask(task.task_id, status).subscribe(() => {
        this.taskService.getTasks().subscribe(this.upd);
      });
    } else {
    }
  }
  showAlert(task: Task) {
    let alert = this.alertCtrl.create({
      title: this.datePipe.transform(task.end_date, 'y/M/d(EEE)'),
      subTitle: task.item,
      buttons: [
        { text: 'Edit', handler: () => { this.navCtrl.push(AddPage, { target: task }); } },
        { text: 'Close' }]
    });
    alert.present();
  }
}