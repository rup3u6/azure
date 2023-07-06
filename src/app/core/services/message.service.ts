import { Injectable, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private templateMap = new Map<string, TemplateRef<any>>();

  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private translateService: TranslateService
  ) {}

  public initTemplate(tempName: string, ref: TemplateRef<any>): void {
    this.templateMap.set(tempName, ref);
  }

  public showNotification(type: string, title: string, msg: string = '') {
    let config = { nzDuration: 5000 };
    switch (type) {
      case 'success':
        this.notification.success(title, msg, config);
        break;
      case 'info':
        this.notification.info(title, msg, config);
        break;
      case 'warning':
        this.notification.warning(title, msg, config);
        break;
      case 'error':
        this.notification.error(title, msg, config);
        break;
      default:
        this.notification.blank(title, msg, config);
        break;
    }
  }

  public showModal(
    type: string,
    msg: { title: string; msgList?: Array<string> },
    callback: any = () => {}
  ) {
    let config = {
      nzTitle: msg.title,
      nzContent: this.templateMap.get('tplContent'),
      nzOkText: '關閉',
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        msgList: msg.msgList,
      },
      nzOnOk: () => callback(),
    };
    switch (type) {
      case 'success':
        this.modal.success(config);
        break;
      case 'info':
        this.modal.info(config);
        break;
      case 'warning':
        this.modal.warning(config);
        break;
      case 'error':
        this.modal.error(config);
        break;
    }
  }

  public closeAllModal() {
    this.modal.closeAll();
  }

  public responseErrorMsgTranslate(status: string, msgOrField: any) {
    if (status === ResponseStatus.資料格式或欄位驗證錯誤) {
      // msgOrField: Array<{field:'', errorMessage:''}>
      let transMsgArray = msgOrField.map((item: any) => {
        let i18nField = item.field;
        //  若不為MXXXX格式，則取用後端給的Message
        let errorMessage = /^M[\d]{4}$/.test(item.errorMessage)
          ? item.errorMessage
          : '';
        let transField = this.translateService.instant(
          'PAGES.' + i18nField.toUpperCase()
        );
        return this.translateService.instant('ERRORS.' + errorMessage, {
          field: transField,
          errorMessage,
        });
      });
      return transMsgArray;
    } else {
      //  msgOrField: string
      return [this.translateService.instant('ERRORS.' + msgOrField)];
    }
  }
}
