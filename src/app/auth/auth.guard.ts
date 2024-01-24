import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate() {
    try {
      return this.authService.getMe().then((user) => {
        if (!user) return this.router.navigate(['/sign-in']);
        return user;
      });
    } catch (e) {
      return this.router.navigate(['/sign-in']);
    }
  }
}

@Injectable({ providedIn: 'root' })
export class LoggedInGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate() {
    try {
      return this.authService.getMe().then((user) => {
        if (user) return this.router.navigate(['/']);
        return true;
      });
    } catch (e) {
      return true;
    }
  }
}
