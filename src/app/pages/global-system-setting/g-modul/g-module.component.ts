import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { GModuleService } from 'src/app/core/services/baseAPI/g-module.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-g-module',
  templateUrl: './g-module.component.html',
  styleUrls: ['./g-module.component.scss']
})
export class GModuleComponent {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    public gModuleService: GModuleService,
    private loadingService: LoadingService
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
      lPk: rowData.mod_Id,
    };
    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.gModuleService.getDetail(body));
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
    let selectedData = this.gModuleService
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
    let selectedData = this.gModuleService
      .getTabulatorTable()
      .getSelectedData();

    let body: any = {
      lCIn_ConvertState_PageData: selectedData.map(item => {
        return {
          lPk: item.mod_Id,
          sName: item.mod_Name
        }
      }),
      sState: "0"
    };
    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.gModuleService.convertState(body));
      const { status } = res;
      if (status === '999') {
        let searchRes = await firstValueFrom(this.gModuleService.search());
        this.gModuleService.getTabulatorTable().setData(searchRes.data ?? []);
        this.popup.component = null
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
