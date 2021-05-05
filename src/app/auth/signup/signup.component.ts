import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupRequestPayload: SignupRequestPayload;
  errorMessage: string;
  usernameEmpty: boolean;
  passwordEmpty: boolean;
  confirmPasswordMatch: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.signupRequestPayload = {
      username: '',
      password: '',
    };
    this.errorMessage = '';
    this.confirmPasswordMatch = true;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  signup() {
    const password = this.signupForm.get('password').value;
    const confirmPassword = this.signupForm.get('confirmPassword').value;

    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.usernameEmpty = !this.signupForm.get('username').valid;
    this.passwordEmpty = !this.signupForm.get('password').valid;
    this.confirmPasswordMatch =
      this.signupForm.get('password').value ===
      this.signupForm.get('confirmPassword').value;

    if (this.usernameEmpty || this.passwordEmpty) {
      return;
    }

    if (!this.confirmPasswordMatch) {
      return;
    }

    this.authService.signup(this.signupRequestPayload).subscribe(
      (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.log(error.error.message);
        this.errorMessage = error.error.message;
      }
    );
  }

  checkPassword() {}
}
