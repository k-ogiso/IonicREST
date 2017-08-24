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

  constructor(
    public navCtrl: NavController,
    private taskService: TaskServiceProvider
  ) {
    taskService.getTasks().subscribe(tasks => { this.tasks = tasks; });
  }
  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe();
  }
  delTask(task_id: number): void {
    this.taskService.delTask(task_id).subscribe();;
  }

  goToAddPage() {
    this.navCtrl.push(AddPage);
  }

}
