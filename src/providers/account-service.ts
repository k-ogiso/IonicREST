import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Const } from '../utils/const';

@Injectable()
export class AccountServiceProvider {
    baseURL = `${Const.API_BASE_URL}${Const.API_VERSION}`;

    constructor(public http: Http) {}

    /**
     * ログイン済みかどうかチェック
     */
    getLogin(): Observable<boolean> {
        return this.http.get(`${this.baseURL}/login`)
        .map(res => res.json() as boolean);
        // return this.http.get(`${this.baseURL}/false.json`)
        //     .map(res => res.json() as boolean);
    }
    /**
     * ログイン
     */
    login(login): Observable<boolean> {
        // return this.http.get(`${this.baseURL}/true.json`)
        return this.http.put(`${this.baseURL}/login`, login)
            .map(res => res.json() as boolean);
    }
    /**
     * サインアップ（アカウント登録）
     */
    signup(login): Observable<boolean> {
        return this.http.post(`${this.baseURL}/login`, login)
        .map(res => res.json() as boolean);
        // return this.http.get(`${this.baseURL}/true.json`)
    }
    /**
     * facebookログイン
     */
    facebookLogin(login): Observable<boolean> {
        // return this.http.get(`${this.baseURL}/true.json`)
        return this.http.put(`${this.baseURL}/facebooklogin`, login)
            .map(res => res.json() as boolean);
    }
}
