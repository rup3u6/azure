import { Component, OnInit } from '@angular/core';
import { finalize, firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';
import { Message } from 'src/app/core/enum/message';

// service
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ServiceActivityService } from 'src/app/core/services/activityAPI/service-activity.service';

@Component({
  selector: 'app-service-activity',
  templateUrl: './service-activity.component.html',
  styleUrls: ['./service-activity.component.scss']
})
export class ServiceActivityComponent {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    public serviceActivityService: ServiceActivityService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.search();
  }

  addPopupHandler() {
    this.popup.data = {
      mode: 'add',
      initData: {},
    };
    this.popup.component = 'add';
  }

  async editPopupHandler(rowData: any) {
    let body = {
      pk_SrvAct: rowData.pk_SrvAct
    };

    this.loadingService.startLoading();

    try {
      let res = await firstValueFrom(this.serviceActivityService.getDetail(body));
      const { status } = res;

      if (status !== ResponseStatus.執行成功) {
        return;
      }

      this.popup.data = {
        mode: 'edit',
        initData: res.data,
      };

      this.popup.component = 'add';
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  async search() {
    this.loadingService.startLoading();
    this.serviceActivityService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.serviceActivityService.getTabulatorTable().setData(res.data);
      });
  }
}
