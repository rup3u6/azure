import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// service
import { UseRoleService } from 'src/app/core/services/authAPI/use-role.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-use-role',
  templateUrl: './use-role.component.html',
  styleUrls: ['./use-role.component.scss']
})
export class UseRoleComponent {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    public useRoleService: UseRoleService,
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
      role_Id: rowData.role_Id,
    };

    this.loadingService.startLoading();

    try {
      let res = await firstValueFrom(this.useRoleService.getDetail(body));
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

  deactivatePopupHandler() {
    let selectedData = this.useRoleService
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
    let selectedData = this.useRoleService
      .getTabulatorTable()
      .getSelectedData();

    let body: any = {
      lCIn_ConvertState_PageData: selectedData.map(item => {
        return {
          lPk: item.role_Id,
          sName: item.role_Name
        }
      }),
      sState: '0',
    };

    this.loadingService.startLoading();

    try {
      let res = await firstValueFrom(this.useRoleService.convertState(body));
      const { status } = res;
      if (status === ResponseStatus.執行成功) {
        let searchRes = await firstValueFrom(this.useRoleService.search());
        this.useRoleService.getTabulatorTable().setData(searchRes.data ?? []);
        this.popup.component = null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
