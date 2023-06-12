import { Injectable, Injector } from '@angular/core';
import { LoginService } from '../services/authAPI/login.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TokenAuthHttpInterceptorService {
  constructor(
    private loginService: LoginService,
    private readonly injector: Injector
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();
    try {
      const translateService = this.injector.get(TranslateService);
      req = req.clone({
        headers: req.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Language', translateService.currentLang)
          .set('Zone', '52753953372377088'),
        responseType: 'text' as 'json',
      });
    } catch (error) {
      // console.log(error)
    }
    return next.handle(req);
  }
}
