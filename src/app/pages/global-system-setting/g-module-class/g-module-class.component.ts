import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GModuleClassService } from 'src/app/core/services/baseAPI/g-module-class.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';

// enum
import { Message } from 'src/app/core/enum/message';

@Component({
  selector: 'app-g-module-class',
  templateUrl: './g-module-class.component.html',
  styleUrls: ['./g-module-class.component.scss']
})
export class GModuleClassComponent {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    public gModuleClassService: GModuleClassService,
    private loadingService: LoadingService,
    private messageService: MessageService
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
      modClass_Id: rowData.modClass_Id,
    };
    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.gModuleClassService.getDetail(body));
      const { status } = res;
      if (status !== '999') {
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

  deactivatePopupHandler() {
    let selectedData = this.gModuleClassService
      .getTabulatorTable()
      .getSelectedData();
    if (selectedData.length === 0) {
      this.messageService.showNotification(Message.warning, '請選擇資料');
      return;
    }
    this.popup.data = {};
    this.popup.component = 'deactivate';
  }

  async deactivateHandler() {
    let selectedData = this.gModuleClassService
      .getTabulatorTable()
      .getSelectedData();

    let body: any = {
      lCIn_ConvertState_PageData: selectedData.map(item => {
        return {
          lPk: item.modClass_Id,
          sName: item.modClass_Name
        }
      }),
      sState: '0',
    };

    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.gModuleClassService.convertState(body));
      const { status } = res;
      if (status === '999') {
        let searchRes = await firstValueFrom(this.gModuleClassService.search());
        this.gModuleClassService.getTabulatorTable().setData(searchRes.data ?? []);
        this.popup.component = null
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
