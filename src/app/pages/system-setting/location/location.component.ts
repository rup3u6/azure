import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';
import { Message } from 'src/app/core/enum/message';

// service
import { LocationService } from 'src/app/core/services/baseAPI/location.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/core/services/message.service';

// component
import { LocationSearchFormComponent } from './location-search-form/location-search-form.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {

  @ViewChild(LocationSearchFormComponent) LocationSearchForm!: LocationSearchFormComponent;

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    public locationService: LocationService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) { }

  addPopupHandler() {
    this.popup.data = {
      mode: 'add',
      initData: {},
    };
    this.popup.component = 'add';
  }

  addPopupCloseHandler(event: any) {
    if (event) {
      this.LocationSearchForm.searchFormGroup.patchValue({
        ck_Location_Code: '',
        cfk_Site: '',
        location_State: '2',
      })
      this.LocationSearchForm.search();
    }

    this.popup.component = null;
  }

  async editPopupHandler(rowData: any) {
    let body = {
      cfk_Zone_Id: rowData.cfk_Zone_Id,
      cfk_Site: rowData.cfk_Site,
      ck_Location_Code: rowData.ck_Location_Code,
    };
    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.locationService.getDetail(body));
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
    let selectedData = this.locationService
      .getTabulatorTable()
      .getSelectedData();
    if (selectedData.length === 0) {
      this.messageService.showNotification(Message.warning, this.translateService.instant('ERRORS.SELECT_ZERO'));
      return;
    }
    this.popup.data = {};
    this.popup.component = 'deactivate';
  }

  async deactivateHandler() {
    let selectedData = this.locationService
      .getTabulatorTable()
      .getSelectedData();

    let body: any = {
      cIn_WfLocation_ConvertState_Pk: selectedData.map(item => {
        return {
          cfk_Zone_Id: item.cfk_Zone_Id,
          cfk_Site: item.cfk_Site,
          ck_Location_Code: item.ck_Location_Code,
          location_Name: item.location_Name,
        }
      }),
      sState: '0',
    };

    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.locationService.convertState(body));
      const { status } = res;
      if (status === ResponseStatus.執行成功) {
        let searchRes = await firstValueFrom(this.locationService.search());
        this.locationService.getTabulatorTable().setData(searchRes.data ?? []);
        this.popup.component = null
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
