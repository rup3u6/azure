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
import { ResponseStatus } from 'src/app/core/enum/responseStatus';
import { Message } from 'src/app/core/enum/message';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ResponseErrorHttpInterceptorService implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    public messageService: MessageService,
    private translateService: TranslateService
  ) {}

  public statusHandler(response: any) {
    //  處理自定義項目
    const { status, message, field } = JSON.parse(response);
    let msgList;
    switch (status) {
      case ResponseStatus.執行失敗:
        msgList = this.messageService.responseErrorMsgTranslate(
          status,
          message
        );
        this.messageService.showModal(Message.error, {
          title: '執行失敗',
          msgList,
        });
        break;
      case ResponseStatus.資料格式或欄位驗證錯誤:
        msgList = this.messageService.responseErrorMsgTranslate(status, field);
        this.messageService.showModal(Message.error, {
          title: '資料格式或欄位驗證錯誤',
          msgList,
        });
        break;

      default:
        this.messageService.showModal(Message.error, {
          title: '錯誤',
          msgList: ['請洽系統管理員'],
        });
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
          const lang = /\/i18n\/(?<lang>.*)\.json$/.exec(url)?.groups?.['lang'];
          console.log(`無${lang}語系語言包`);
          try {
            setTimeout(() => {
              this.translateService.use('EN_b');
            }, 0);
          } catch (error) {
            // console.log(error)
          }
          return throwError(() => error);
        }

        const { status: httpStatus, error: response } = error;

        //  先處理httpStatus

        switch (httpStatus) {
          case 401:
          case 403:
            this.messageService.showModal(
              Message.warning,
              {
                title: '登入逾時',
                msgList: ['請重新登入'],
              },
              () => this.loginService.logout()
            );
            break;
          case 404:
            this.messageService.showModal(Message.error, {
              title: 'Not Found',
              msgList: ['URL錯誤'],
            });
            break;
          case 405:
            this.messageService.showModal(Message.error, {
              title: 'Method Not Allowed',
              msgList: ['Request的Method錯誤'],
            });
            break;
          case 415:
            this.messageService.showModal(Message.error, {
              title: 'Unsupported Media Type',
              msgList: ['Request的Content-Type錯誤'],
            });
            break;
          case 504:
            this.messageService.showModal(Message.error, {
              title: 'Gateway Timeout',
              msgList: ['請洽系統管理員'],
            });
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
