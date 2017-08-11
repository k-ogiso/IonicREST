import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { User } from '../../providers/user/User';
 
@Injectable()
export class UserServiceProvider {
 
  constructor(public http: Http) {
  }
 
  getUsers(): Observable<User[]>{
    return this.http.get('http://localhost:5000/todo/api/v1.0/tasks')
       .map(res => {console.log(JSON.stringify(res)); return <Array<User>>res.json(); }); 
  }
 
}