import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-sign-up',
  templateUrl: './login-sign-up.component.html',
  styleUrls: ['./login-sign-up.component.css']
})
export class LoginSignUpComponent implements OnInit {

  state: string;
  email: string;
  password: string;
  signUpEmail: string;
  signUpPassword: string;
  resignUpPassword: string;
  firstName: string;
  lastName: string;
  authCode: string;
  address: string;

  onSwitchState(state: string) {
    if (this.state !== state) {
      this.state = state;
    }
  }

  onLogin() {
      this.authService.loginUser(this.email, this.password);
  }

  onSignUp() {
    if ( this.signUpPassword === this.resignUpPassword ) {
      this.authService.createUser(this.signUpEmail, this.signUpPassword, this.firstName, this.lastName, this.authCode, this.address);
    } else {
      alert('Passwords Do Not Match');
    }
  }

  testing() {
    this.router.navigate(['timesheet/23432efesddfe']);
  }
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.state = 'Login';
  }

}
