import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaskServiceProvider } from '../../providers/task-service';
import { Task } from '../../model/task';
import { DatePipe } from '@angular/common'
import { AddPage } from '../add/add';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
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

  filt = (rec: Task): boolean => {
    const end_date_ymd = this.endDateToYmd(rec.end_date);
    const cur_date_ymd = this.currentDateYmd;
    if ((!this.tglFlg && rec.status !== 0) || (this.pastFlg && cur_date_ymd > end_date_ymd)) {
      return false;
    } else {
      return true;
    }
  }

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
    this.taskService.getTasks().subscribe(tasks => { this.tasks = tasks; });
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
  onClick(task_id) {
    this.taskService.updTask(task_id).subscribe(() => {
      this.taskService.getTasks().subscribe(tasks => { this.tasks = tasks; });
    });
  }
  onDblclick(task) {
    if (task.status !== 1) {
      this.taskService.updTask(task.task_id).subscribe(() => {
        this.taskService.getTasks().subscribe(tasks => { this.tasks = tasks; });
      });
    } else {
    }
  }
  onHold(task) {
    if (task.status !== 1) {
      this.taskService.updTask(task.task_id).subscribe(() => {
        this.taskService.getTasks().subscribe(tasks => { this.tasks = tasks; });
      });
    } else {
    }
  }
  onTap(task) {
    if (task.status !== 1) {
      this.taskService.updTask(task.task_id).subscribe(() => {
        this.taskService.getTasks().subscribe(tasks => { this.tasks = tasks; });
      });
    } else {
    }
  }
  showAlert(task: Task) {
    let alert = this.alertCtrl.create({
      title: this.datePipe.transform(task.end_date, 'y/M/d(EEE)'),
      subTitle: task.item,
      buttons: ['Close']
    });
    alert.present();
  }
}