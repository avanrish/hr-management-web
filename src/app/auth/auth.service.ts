import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, Observable, tap, throwError } from 'rxjs';

import { User } from '../common/types/user';
import { SignInResponse } from '../common/types/sign-in-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

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

  signIn(email: string, password: string): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>('/auth/sign-in', { email, password })
      .pipe(
        tap((data) => {
          this.setMe(data['user']);
          this.setAuthToken(data['token']);
          this.router.navigate(['/']);
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
  }

  signOut() {
    this.user = null;
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

  async getMe() {
    if (this.user) {
      return this.user;
    }
    try {
      const data = await firstValueFrom(this.http.get<User>('/users/me'));
      this.setMe(data);
      return data;
    } catch {
      return null;
    }
  }

  setMe(user: User) {
    this.user = user;
  }
}
