import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  userId: number;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.isLoggedIn = this.authService.authenticated();

    this.authService.userId.subscribe(
      (data: number) => (this.userId = data)
    );
    this.userId = this.authService.getId();
      
  }

  goToUserProfile() {
    this.router.navigateByUrl('/profile/' + this.userId);
  }
}
