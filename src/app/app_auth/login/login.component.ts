import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'
import { User } from '../../models/auth/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: User;
  message: string;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.loginUserData = new User();
  }

  loginUser(){
    console.log(this.loginUserData);
    this._authService.loginUser(this.loginUserData)
    .subscribe(
      res => {console.log(res);
      this.message = "Successfully loggedIn";},
      err => {console.log(err);
      this.message = err.error.errors.error[0];}
    );
  }

}
