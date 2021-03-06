import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Task } from '../model/task';
import { Const } from '../utils/const';

@Injectable()
export class TaskServiceProvider {
  baseURL = `${Const.API_BASE_URL}${Const.API_VERSION}`;

  constructor(public http: Http) {
  }

  /**
   * 全タスクを取得
   */
  getTasks(): Observable<Task[]> {
    return this.http.get(`${this.baseURL}/tasks`)
      .map(res => res.json() as Task[]);
  }
  /**
   * ID指定でタスクを取得
   */
  getTaskById(task_id: number): Observable<Task> {
    return this.http.get(`${this.baseURL}/task/${task_id}`)
      .map(res => res.json() as Task);
  }
  /**
   * 新規タスクを登録
   */
  addTask(task: Task): Observable<Task> {
    return this.http.post(`${this.baseURL}/task`, task)
      .map(res => null);
  }
  /**
   * タスクを削除
   */
  delTask(task_id: number): Observable<boolean> {
    return this.http.delete(`${this.baseURL}/task/${task_id}`)
      .map(res => res.json() as boolean);
  }
  /**
   * タスクのステータスを更新
   */
  updTask(task_id: number, status: number): Observable<boolean> {
    return this.http.put(`${this.baseURL}/task/${task_id}`, { status: status })
      .map(res => res.json() as boolean);
  }
  /**
   * タスクを更新
   */
  edtTask(task: Task): Observable<boolean> {
    return this.http.put(`${this.baseURL}/task/${task.task_id}`, { task: task })
      .map(res => res.json() as boolean);
  }
}
