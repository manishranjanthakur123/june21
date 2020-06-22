import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of as ObservableOf } from 'rxjs';
import { throwError as ObservableThrow } from 'rxjs';

import { HttpClientModule, HttpClient } from '@angular/common/http'
import { User } from '../../models/auth/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://127.0.0.1:8000/api/account/register";
  private _loginUrl = "http://127.0.0.1:8000/api/account/login";

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any>{
    return this.http.post(this._registerUrl, user);
  }

  loginUser(user: User): Observable<any>{
    return this.http.post(this._loginUrl, user);
  }
}
