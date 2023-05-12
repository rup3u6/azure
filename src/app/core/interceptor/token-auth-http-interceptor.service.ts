import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthHttpInterceptorService {

  constructor(private loginService:LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();
    req = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token}`),
    });
    return next.handle(req);
  }
}
