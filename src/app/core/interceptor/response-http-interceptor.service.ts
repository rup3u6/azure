import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponseHttpInterceptorService {
  constructor() {}

  replacer(key: string, value: any): any {
    if (typeof value === 'number') {
      return BigInt(value).toString();
    }
    return value;
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((res: any) => {
        if (req.responseType === 'blob') {
          void 0;
        } else if (res instanceof HttpResponse) {
          // 將number轉型為string，避免Bigint溢位
          res = res.clone({
            body: JSON.parse(JSON.stringify(res.body, this.replacer)),
          });
        }
        return res;
      }),
      tap((res) => {
        if (req.responseType === 'blob') {
          void 0;
        } else if (res instanceof HttpResponse) {
          console.log(res);
          const { url } = req;
          //  i18n不通知
          if (/\/i18n\/.*\.json$/.test(url)) {
            return;
          }
          const { status, data, message } = res.body;
          if (status) {
            switch (status) {
              case '999':
                if (/\/Get/.test(url)) {
                  break;
                }
                // alert('成功');
                break;

              default:
                alert(message);
                break;
            }
          }
        }
      })
    );
  }
}
