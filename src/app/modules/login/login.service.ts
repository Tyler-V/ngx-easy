import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { AppService } from '../../app.service';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient,
    private app: AppService
  ) { }

  createAccount(user: User): Observable<any> {
    return this.http.post(`${this.app.api}/users`, JSON.stringify(user));
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.app.api}/auth/login`, JSON.stringify(user));
  }
}
