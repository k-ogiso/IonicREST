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
  endDate: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private taskService: TaskServiceProvider
  ) {

    this.item = navParams.get("item");
    this.endDate = navParams.get("endDate");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  goToHomePage() {
    this.navCtrl.push(HomePage);
  }

  addTask(): void {
    console.log("addTask");
    console.log(this.item);
    // this.taskService.addTask(task).subscribe();
  }

}
