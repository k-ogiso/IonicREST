import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TaskServiceProvider } from '../../providers/task-service';
import { Task } from '../../model/task';
import { HomePage } from '../home/home';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

/**
 * Generated class for the AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  item: string;
  endDate;
  errmsg: string;
  closeResult: string;
  fixedTaskList: string[] = ["pay", "call", "send", "check", "get", "goto"];
  recomendTasks: string[] = [];

  constructor(
    public navCtrl: NavController,
    private taskService: TaskServiceProvider,
    private modalService: NgbModal
  ) {
    // this.item.setFocus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  goToHomePage() {
    this.navCtrl.pop(HomePage);
  }

  addTask(): void {

    if (this.item === undefined || this.endDate === undefined) {
      this.errmsg = "未入力項目があります"
      return;
    }

    const task = new Task();
    task.item = this.item;
    task.end_date = this.endDate.year.toString() + "-" + this.endDate.month.toString() + "-" + this.endDate.day.toString();

    console.log(task);

    // this.taskService.addTask({ "item":task.item,"end_date":task.end_date }).subscribe();

    this.taskService.addTask(task).subscribe();

    this.goToHomePage();
  }

  showRecomendItem(e) {

    this.recomendTasks = [];

    if (this.item.length != 0) {
      for (var i = 0; i < this.fixedTaskList.length; i++) {
        if (this.item.substr(0, this.item.length) == this.fixedTaskList[i].substr(0, this.item.length)) {
          console.log(this.fixedTaskList[i]);
          this.recomendTasks.push(this.fixedTaskList[i]);
        }
      }
    }
    console.log(e);

    console.log(this.recomendTasks);

  }

  selectTask(task) {
    console.log(task);
    this.item = task;
  }

}
