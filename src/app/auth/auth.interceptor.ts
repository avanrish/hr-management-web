import { inject } from '@angular/core';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { AuthService } from './auth.service';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const authToken = inject(AuthService).getAuthToken();
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
}
