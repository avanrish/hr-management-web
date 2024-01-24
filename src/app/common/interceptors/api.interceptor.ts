import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export function apiInterceptor<T>(req: HttpRequest<T>, next: HttpHandlerFn) {
  const apiReq = req.clone({ url: `${environment.apiUrl}${req.url}` });
  return next(apiReq);
}
