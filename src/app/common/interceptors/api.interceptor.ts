import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

import { environment } from '../../../environments/environment';

export function apiInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const apiReq = req.clone({ url: `${environment.apiUrl}${req.url}` });
  return next(apiReq);
}
