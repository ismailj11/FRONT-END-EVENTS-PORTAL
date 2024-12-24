import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add auth header with jwt if account is logged in and request is to the api url
      const token = localStorage.getItem("token");
      
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (token && isApiUrl) {
          request = request.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
          });
      }

      return next.handle(request);
  }
}