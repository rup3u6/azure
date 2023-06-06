import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from '../services/authAPI/login.service';
import { MessageService } from '../services/message.service';

// enum
import { Message } from 'src/app/core/enum/message';

@Injectable({
  providedIn: 'root',
})
export class ResponseErrorHttpInterceptorService implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    public messageService: MessageService
  ) {}

  public statusHandler(response: any) {
    //  處理自定義項目
    const { status } = response;

    switch (status) {
      case '900':
        this.messageService.showNotification(Message.error, '執行失敗');
        break;
      case '901':
        this.messageService.showNotification(
          Message.warning,
          '資料格式或欄位驗證錯誤'
        );
        break;

      default:
        this.messageService.showNotification(
          Message.error,
          '未知的錯誤',
          '請洽系統管理員'
        );
        break;
    }
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const { url } = request;
        //  i18n不通知
        if (/\/i18n\/.*\.json$/.test(url)) {
          return throwError(() => error);
        }

        const { status: httpStatus, error: response } = error;

        //  先處理httpStatus

        switch (httpStatus) {
          case 401:
          case 403:
            this.messageService.showModal(
              {
                title: '登入逾時',
                msgList: ['請重新登入'],
              },
              () => this.loginService.logout()
            );
            break;
          case 404:
            this.messageService.showNotification(
              Message.error,
              'Not Found',
              'URL錯誤'
            );
            break;
          case 405:
            this.messageService.showNotification(
              Message.error,
              'Not Found',
              'Request的Method錯誤'
            );
            break;
          case 415:
            this.messageService.showNotification(
              Message.error,
              'Unsupported Media Type',
              'Request的Content-Type錯誤'
            );
            break;
          case 504:
            this.messageService.showNotification(
              Message.error,
              'Gateway Timeout',
              '請洽系統管理員'
            );
            break;
          default:
            this.statusHandler(response);
            break;
        }

        return throwError(() => error);
      })
    );
  }
}
