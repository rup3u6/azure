import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GZoneService } from 'src/app/core/services/baseAPI/g-zone.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-g-zone',
  templateUrl: './g-zone.component.html',
  styleUrls: ['./g-zone.component.scss']
})
export class GZoneComponent {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    public gZoneService: GZoneService,
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
      zone_Id: rowData.zone_Id,
    };
    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.gZoneService.getDetail(body));
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
    let selectedData = this.gZoneService
      .getTabulatorTable()
      .getSelectedData();
    if (selectedData.length === 0) {
      this.messageService.showNotification('info', '請選擇資料');
      return;
    }
    this.popup.data = {};
    this.popup.component = 'deactivate';
  }

  async deactivateHandler() {
    let selectedData = this.gZoneService
      .getTabulatorTable()
      .getSelectedData();

    let body: any = {
      lCIn_ConvertState_PageData: [
        {
          lPk: selectedData[0].zone_Id,
          sName: selectedData[0].zone_Name
        }
      ],
      sState: "0"
    };

    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.gZoneService.convertState(body));
      const { status } = res;
      if (status === '999') {
        let searchRes = await firstValueFrom(this.gZoneService.search());
        this.gZoneService.getTabulatorTable().setData(searchRes.data ?? []);
        this.popup.component = null
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
