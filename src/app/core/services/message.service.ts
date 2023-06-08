import { Injectable, Injector, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private templateMap = new Map<string, TemplateRef<any>>();

  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private readonly injector: Injector
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
  public responseErrorMsgTranslate(msg: string, field: Array<any>) {
    const translateService = this.injector.get(TranslateService);
    if (field?.length) {
      let transMsgArray = field.map(
        ({ field: i18nField = ' ', errorMessage }) => {
          let transField = translateService.instant(i18nField.toUpperCase());
          return translateService.instant(errorMessage, { field: transField });
        }
      );
      return transMsgArray;
    } else {
      let transMsg = translateService.instant(msg);
      return transMsg === msg ? [`errorCode：${transMsg}`] : [transMsg];
    }
  }
}
