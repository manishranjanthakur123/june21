import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'
import { User } from '../../models/auth/user'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginUserData: User;
  message: string;

  // public loginForm: FormGroup; = new FormGroup({
  //   email: new FormControl(null, Validators.required)
  // })
  public loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService) {
    this.createForm();
    this.loginUserData = new User();
   }

  ngOnInit() {
  }

  createForm(){
    this.loginForm = this._fb.group({
      email:[null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  loginUser(){
    if(!this.loginForm.valid){
      console.log('Invalid Form');
      return;
    }
    this.loginUserData = Object.assign({}, this.loginForm.value);
    console.log(this.loginUserData);
    this._authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.user.token)
        this.message = "Successfully loggedIn";
      },
      err => {
        console.log(err);
        this.message = err.error.errors.error[0];
      }
    );
  }

}
