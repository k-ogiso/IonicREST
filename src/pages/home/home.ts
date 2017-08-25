import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaskServiceProvider } from '../../providers/task-service';
import { Task } from '../../model/task';
import { AddPage } from '../add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: Task[];
  tglFlg: boolean;
  pastFlg: boolean;
  month: string;
  month2: string;
  day: string;
  year: string;

  filt = (rec: Task): boolean => {
    const end_date_ymd = rec.end_date.split(" ")[0];
    const cd = new Date();
    let m = (this.month2.length === 1 ? "0" : "") + this.month2;
    let d = (this.day.length === 1 ? "0" : "") + this.day;
    const cur_date_ymd = cd.getFullYear() + "-" + m + "-" + d;
    if ((!this.tglFlg && rec.status !== 0) || (this.pastFlg && cur_date_ymd > end_date_ymd)) {
      return false;
    } else {
      return true;
    }
  }

  constructor(
    public navCtrl: NavController,
    private taskService: TaskServiceProvider
  ) {
    const a = new Date();
    this.day = String(a.getDate());
    this.month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][a.getMonth()];
    this.month2 = String(a.getMonth() + 1);
    this.year = String(a.getFullYear());
    this.tasks = [];
    this.tglFlg = false;
    this.pastFlg = true;
    taskService.getTasks().subscribe(tasks => { this.tasks = tasks; });
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
}