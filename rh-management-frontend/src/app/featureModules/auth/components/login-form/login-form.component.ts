import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  isShown = 'password';
  hidden = true;
  userInNotValid=false;
  errorMessage:String="";
  errorType:String="";

  constructor(private _authService: AuthService, private _router:Router) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this._authService
      .login({ email: this.email?.value, password: this.password?.value })
      .subscribe((res:any) => {
        console.log(res)
        localStorage.setItem('token',res.token);
        this._router.navigate(['/employee/admin']);
      },err=>{
        this.userInNotValid=true;
        this.errorMessage="email or password are wrong!";
        this.errorType="danger"
      });
  }

  hidePassword() {
    this.hidden = !this.hidden;
    !this.hidden ? (this.isShown = 'text') : (this.isShown = 'password');
  }

}
