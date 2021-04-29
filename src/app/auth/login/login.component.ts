import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  errorOccurred: boolean;
  usernameEmpty: boolean;
  passwordEmpty: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.loginRequestPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.usernameEmpty = !this.loginForm.get('username').valid;
    this.passwordEmpty = !this.loginForm.get('password').valid;

    if (this.usernameEmpty || this.passwordEmpty) {
      return;
    }

    this.authService.login(this.loginRequestPayload).subscribe(
      (data) => {
        this.router.navigateByUrl('');
        this.errorOccurred = false;
        console.log(data);
      },
      (error) => {
        this.errorOccurred = true;
        throwError(error);
      }
    );
  }
}
