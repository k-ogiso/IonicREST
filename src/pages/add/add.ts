import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { TaskServiceProvider } from '../../providers/task-service';
import { Task } from '../../model/task';
import { Const } from '../../utils/const';
import { NgbDateStruct, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

const today = new Date();

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
  providers: [NgbTooltipConfig] // add NgbTooltipConfig to the component providers
})
export class AddPage {
  @ViewChild("it")
  it: any;
  @ViewChild("dp")
  dp: ElementRef;
  task: Task;
  endDate: NgbDateStruct;
  errmsg: string = "";
  closeResult: string;
  fixedTaskList: string[] = ["pay", "call", "send", "check", "get", "go to"];
  recomendTasks: string[] = [];
  errorFunc = error => {
    this.alertCtrl.create({
      title: 'error',
      subTitle: 'Network Error!',
      buttons: ['Close']
    }).present();
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public taskService: TaskServiceProvider,
    public config: NgbTooltipConfig,
    public ga: GoogleAnalytics,
  ) {
    // customize default values of tooltips used by this component tree
    config.placement = 'bottom';
    config.triggers = 'click';
    this.recomendTasks = [];
    const target = this.navParams.get('target') as Task;
    if (target) {
      this.task = target;
      const ary = target.end_date.split(' ')[0].split('-');
      this.endDate = { year: Number(ary[0]), month: Number(ary[1]), day: Number(ary[2]) };
      this.ga.trackView('edit');
    } else {
      this.task = new Task();
      this.task.task_id = -1;
      this.endDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
      this.ga.trackView('add');
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
    setTimeout(() => { this.it.setFocus(); }, 1000);
  }
  goToHomePage() {
    this.navCtrl.pop();
  }
  addTask(): void {
    if (this.task.item === undefined || this.endDate === undefined) {
      this.errmsg = "未入力項目があります"
      return;
    }
    const m = (this.endDate.month > 9 ? '' : '0') + this.endDate.month;
    const d = (this.endDate.day > 9 ? '' : '0') + this.endDate.day;
    this.task.end_date = this.endDate.year + "-" + m + "-" + d;
    console.log(this.task);
    if (this.task.task_id !== -1) {
      this.taskService.addTask(this.task).subscribe(() => { }, this.errorFunc);
      this.ga.trackEvent(Const.GA_EVENT_EDIT_TASK, 'edit');
    } else {
      this.taskService.edtTask(this.task).subscribe(() => { }, this.errorFunc);
      this.ga.trackEvent(Const.GA_EVENT_EDIT_TASK, 'add');
    }
    this.goToHomePage();
  }
  showRecomendItem() {
    this.recomendTasks = [];
    if (this.task.item && this.task.item.length > 0) {
      for (var i = 0; i < this.fixedTaskList.length; i++) {
        if (this.task.item.substr(0, this.task.item.length).toLowerCase() == this.fixedTaskList[i].substr(0, this.task.item.length)) {
          console.log(this.fixedTaskList[i]);
          this.recomendTasks.push(this.fixedTaskList[i]);
        }
      }
    }
    console.log(this.recomendTasks);
  }
  selectTask(task, e) {
    console.log(task);
    console.log(e);
    this.task.item = task + " ";
    this.showRecomendItem();
    this.ga.trackEvent(Const.GA_EVENT_UI, 'recommend');
  }
}
