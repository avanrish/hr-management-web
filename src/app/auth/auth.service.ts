import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  catchError,
  firstValueFrom,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  subject = new Subject();
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

  signIn(email: string, password: string): Observable<any> {
    return this.http.post('/auth/sign-in', { email, password }).pipe(
      tap((data: any) => {
        this.setMe(data['user']);
        this.setAuthToken(data['token']);
        this.router.navigate(['/']);
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
