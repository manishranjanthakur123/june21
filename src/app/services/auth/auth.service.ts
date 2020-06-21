import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of as ObservableOf } from 'rxjs';
import { throwError as ObservableThrow } from 'rxjs';

import { HttpClientModule, HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://manishranjan.pythonanywhere.com/api/account/register";
  private _loginUrl = "http://manishranjan.pythonanywhere.com/api/account/login";

  constructor(private http: HttpClient) { }

  registerUser(user): Observable<any>{
    return this.http.post(this._registerUrl, user);
  }

  loginUser(user): Observable<any>{
    return this.http.post(this._loginUrl, user);
  }
}
