import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';
import { Message } from 'src/app/core/enum/message';

// service
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NMailService } from 'src/app/core/services/authAPI/n-mail.service';

@Component({
  selector: 'app-n-mail',
  templateUrl: './n-mail.component.html',
  styleUrls: ['./n-mail.component.scss']
})
export class NMailComponent {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    public nMailService: NMailService,
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
    // let body = {
    //   zone_Id: rowData.zone_Id,
    // };
    // this.loadingService.startLoading();
    // try {
    //   let res = await firstValueFrom(this.nMailService.getDetail(body));
    //   const { status } = res;
    //   if (status !== ResponseStatus.執行成功) {
    //     return;
    //   }
    //   this.popup.data = {
    //     mode: 'edit',
    //     initData: res.data,
    //   };
    //   this.popup.component = 'add';
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   this.loadingService.stopLoading();
    // }
  }

  deactivatePopupHandler() {
    let selectedData = this.nMailService
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
    let selectedData = this.nMailService
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

    // this.loadingService.startLoading();
    try {
      // let res = await firstValueFrom(this.nMailService.convertState(body));
      // const { status } = res;
      // if (status === ResponseStatus.執行成功) {
      //   let searchRes = await firstValueFrom(this.nMailService.search());
      //   this.nMailService.getTabulatorTable().setData(searchRes.data ?? []);
      //   this.popup.component = null
      // }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
