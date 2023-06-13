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
    private translateService: TranslateService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();
    try {
      //  responseType非json的維持，以確保blob格式
      let responseType =
        req.responseType === 'json' ? 'text' : req.responseType;
      req = req.clone({
        headers: req.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Language', this.translateService.currentLang)
          .set('Zone', '52753953372377088'),
        responseType,
      });
    } catch (error) {
      // console.log(error)
    }
    return next.handle(req);
  }
}
