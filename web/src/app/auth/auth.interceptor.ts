import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly whitelistedEndpoints = ['/auth/sign-in'];

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.whitelistedEndpoints.includes(req.url)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.authenticatedUserToken}`
        }
      });
    }
    return next.handle(req);
  }
}
