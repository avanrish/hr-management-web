import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  setAuthToken(token: string) {
    localStorage.setItem('token', token);
  }

  signIn(email: string, password: string) {
    this.http
      .post('/auth/sign-in', { email, password })
      .subscribe((data: any) => {
        this.setMe(data['user']);
        this.setAuthToken(data['token']);
        this.router.navigate(['/']);
      });
  }

  async getMe() {
    if (this.user) {
      return this.user;
    }
    try {
      const data = await firstValueFrom(this.http.get('/users/me'));
      this.setMe(data);
      return data;
    } catch {
      return null;
    }
  }

  setMe(user: any) {
    this.user = user;
  }
}
