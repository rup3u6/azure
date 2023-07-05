import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';
import { Message } from 'src/app/core/enum/message';

// service
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { GDistrictManagerService } from 'src/app/core/services/baseAPI/g-district-manager.service';

@Component({
  selector: 'app-g-district-manager',
  templateUrl: './g-district-manager.component.html',
  styleUrls: ['./g-district-manager.component.scss']
})
export class GDistrictManagerComponent {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    public gDistrictManagerService: GDistrictManagerService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private translateService: TranslateService,
  ) { }

  addPopupHandler() {
    this.popup.data = {
      mode: 'add',
      initData: {},
    };
    this.popup.component = 'add';
  }

  async editPopupHandler(rowData: any) {
    let body = {
      pk_DistMgr: rowData.pk_DistMgr
    };

    this.loadingService.startLoading();

    try {
      let res = await firstValueFrom(this.gDistrictManagerService.getDetail(body));
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

  deletePopupHandler() {
    let selectedData = this.gDistrictManagerService
      .getTabulatorTable()
      .getSelectedData();
    if (selectedData.length === 0) {
      this.messageService.showNotification(
        Message.warning,
        this.translateService.instant('ERRORS.SELECT_ZERO')
      );
      return;
    }
    this.popup.data = {};
    this.popup.component = 'deactivate';
  }

  async deleteHandler() {
    let selectedData = this.gDistrictManagerService
      .getTabulatorTable()
      .getSelectedData();

    let body: any = selectedData.map((item) => {
      return {
        pk_DistMgr: item.pk_DistMgr,
        info_Jobnumber: item.info_Jobnumber,
        info_Name: item.info_Name,
      };
    });

    this.loadingService.startLoading();

    try {
      let res = await firstValueFrom(this.gDistrictManagerService.delete(body));
      const { status } = res;
      if (status === ResponseStatus.執行成功) {
        let searchRes = await firstValueFrom(this.gDistrictManagerService.search());
        this.gDistrictManagerService.getTabulatorTable().setData(searchRes.data ?? []);
        this.popup.component = null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
