import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {'email': '', 'username': '', 'password': ''};
  confirmPassword: string = "";
  message: string;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  registerUser(){
    console.log(this.registerUserData);
    this.message = "";
    this._authService.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res);
        this.message = "Successfully Created Account";
      },
      err => {
        console.log(err);
        if(err.error.errors.email){
          this.message = "email: " + err.error.errors.email;
        }
        if(err.error.errors.username){
          this.message += "username: " +  err.error.errors.username;
        }
        if(err.error.errors.password){
          this.message += "password: " +  err.error.errors.password;
        }
         //+ err.error.errors.username + err.error.errors.password;
      }
    );
  }

}
