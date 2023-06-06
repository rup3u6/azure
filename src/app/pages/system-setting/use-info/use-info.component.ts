import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// service
import { UseInfoService } from 'src/app/core/services/baseAPI/use-info.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-use-info',
  templateUrl: './use-info.component.html',
  styleUrls: ['./use-info.component.scss']
})
export class UseInfoComponent  {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    public useInfoService: UseInfoService,
    private loadingService: LoadingService
  ) {}

  async editPopupHandler(rowData: any) {
    console.log(rowData);

    let body = {
      info_Id: rowData.info_Id,
    };

    this.loadingService.startLoading();

    try {
      let res = await firstValueFrom(this.useInfoService.getDetail(body));
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
    let selectedData = this.useInfoService
      .getTabulatorTable()
      .getSelectedData();
    if (selectedData.length === 0) {
      alert('請選擇資料');
      return;
    }
    this.popup.data = {};
    this.popup.component = 'deactivate';
  }

  async deactivateHandler() {
    let selectedData = this.useInfoService
      .getTabulatorTable()
      .getSelectedData();

    let body: any = {
      lCIn_ConvertState_PageData: selectedData.map(item => {
        return {
          lPk: item.lang_Code,
          sName: item.lang_Name
        }
      }),
      sState: '0',
    };

    this.loadingService.startLoading();

    try {
      let res = await firstValueFrom(this.useInfoService.convertState(body));
      const { status } = res;
      if (status === '999') {
        let searchRes = await firstValueFrom(this.useInfoService.search());
        this.useInfoService.getTabulatorTable().setData(searchRes.data ?? []);
        this.popup.component = null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
