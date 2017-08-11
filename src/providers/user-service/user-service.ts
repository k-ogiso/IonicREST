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
    return this.http.get('https://api.github.com/users')
       .map(res => <Array<User>>res.json()); 
  }
 
}