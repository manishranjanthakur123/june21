import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'
import { User } from '../../models/auth/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerUserData: User;
  public registrationForm: FormGroup;
  confirmPassword: string = "";
  message: string;

  constructor(private _fb: FormBuilder,private _authService: AuthService) { 
    this.createForm();
    this.registerUserData = new User();
  }

  ngOnInit() {
  }

  createForm(){
    this.registrationForm = this._fb.group({
      email:[null, Validators.required],
      username:[null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  registerUser(){
    if(!this.registrationForm.valid){
      console.log('Invalid Form');
      return;
    }
    this.registerUserData = Object.assign({}, this.registrationForm.value);
    console.log(this.registerUserData);
    this.message = "";
    this._authService.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.user.token)
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
