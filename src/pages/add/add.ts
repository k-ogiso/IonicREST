import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskServiceProvider } from '../../providers/task-service';
import { Task } from '../../model/task';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  item: string;
  endDate;
  errmsg: string;

  constructor(
    public navCtrl: NavController,
    private taskService: TaskServiceProvider
  ) {

 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  goToHomePage() {
    this.navCtrl.push(HomePage);
  }

  addTask(): void {

    var task;


    if (this.item === undefined || this.endDate === undefined) {
      this.errmsg = "未入力項目があります"
      return;
    }


    task = new Object();
    task.item = this.item;
    task.end_date = this.endDate.year.toString() + "-" + this.endDate.month.toString() + "-" + this.endDate.day.toString();

    console.log(task);

    this.taskService.addTask({ "item":task.item,"end_date":task.end_date }).subscribe();

    // this.taskService.addTask(task).subscribe();

    this.goToHomePage();
  }

}
