import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponseHttpInterceptorService {
  constructor() {}
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((res) => {
        if (res instanceof HttpResponse) {
          console.log(req);
          const { url } = req;
          //  i18n不通知
          if (/\/i18n\/.*\.json$/.test(url)) {
            return;
          }
          const { status, data, message } = res.body;
          console.log(res);
          switch (status) {
            case '999':
              if (/\/Get/.test(url)) {
                break;
              }
              alert('成功');
              break;

            default:
              alert(message);
              break;
          }
          if (status !== '999') {
          }
        }
      })
    );
  }
}
