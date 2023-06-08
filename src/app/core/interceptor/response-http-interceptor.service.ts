import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { MessageService } from '../services/message.service';

// enum
import { Message } from 'src/app/core/enum/message';

@Injectable({
  providedIn: 'root',
})
export class ResponseHttpInterceptorService {
  constructor(private messageService: MessageService) {}

  replacer(_key: string, value: any): any {
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
          const { status, message, field } = res.body;
          if (status) {
            switch (status) {
              case '999':
                //  login及所有get/getDetail 成功不通知
                if (/\/(Get|Login|ListItem|)/.test(url)) {
                  break;
                }
                this.messageService.showModal(Message.success, {
                  title: '執行成功',
                });
                break;
              case '901':
                this.messageService.showModal(Message.warning, {
                  title: '資料格式或欄位驗證錯誤',
                });
                break;
              case '900':
                this.messageService.showModal(Message.error, {
                  title: '執行失敗',
                });
                break;
              default:
                this.messageService.showModal(Message.error, {
                  title: '執行失敗',
                  msgList: ['請洽系統管理員'],
                });
                break;
            }
          }
        }
      })
    );
  }
}
