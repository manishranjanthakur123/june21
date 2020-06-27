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
  private _registerUrl = "https://manishranjan.pythonanywhere.com/api/account/register";
  private _loginUrl = "https://manishranjan.pythonanywhere.com/api/account/login";
  private _diagnoseUrl = "https://manishranjan.pythonanywhere.com/api/diagnose/medicalentity/";

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any>{
    return this.http.post(this._registerUrl, user);
  }

  loginUser(user: User): Observable<any>{
    return this.http.post(this._loginUrl, user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  } 

  getToken(){
    return localStorage.getItem('token') ? localStorage.getItem('token') : "";
  }

  logout(){
    localStorage.removeItem('token')
  }

  processImage(imageProcessData: any): Observable<any>{
    return this.http.post(this._diagnoseUrl, imageProcessData);
  }
}
