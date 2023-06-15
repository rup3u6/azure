import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// component
import { UseInfoSearchFormComponent } from 'src/app/pages/system-setting/use-info/use-info-search-form/use-info-search-form.component';

// service
import { UseInfoService } from 'src/app/core/services/authAPI/use-info.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-use-info',
  templateUrl: './use-info.component.html',
  styleUrls: ['./use-info.component.scss']
})
export class UseInfoComponent {

  @ViewChild(UseInfoSearchFormComponent) sysUseInfoSearchForm!: UseInfoSearchFormComponent;

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    public useInfoService: UseInfoService,
    private loadingService: LoadingService
  ) { }

  async editPopupHandler(rowData: any) {
    console.log(rowData);

    let body = {
      info_Id: rowData.info_Id,
    };

    this.loadingService.startLoading();

    try {
      let res = await firstValueFrom(this.useInfoService.getDetail(body));
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

  async seachHandler() {
    this.sysUseInfoSearchForm.search();
  }
}
