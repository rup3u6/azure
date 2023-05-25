import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LocationService } from 'src/app/core/services/baseAPI/location.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {
  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    public locationService: LocationService,
    private loadingService: LoadingService
  ) {}

  addPopupHandler() {
    this.popup.data = {
      mode: 'add',
      initData: {},
    };
    this.popup.component = 'add';
  }

  async editPopupHandler(rowData: any) {
    let body = {
      lPk: rowData.location_Id,
    };
    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.locationService.getDetail(body));
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
    let selectedData = this.locationService
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
    let selectedData = this.locationService
      .getTabulatorTable()
      .getSelectedData();

    let body: any = {
      lPk:selectedData[0].location_Id,
      bState: false,
    };

    this.loadingService.startLoading();
    try {
      let  res = await firstValueFrom(this.locationService.convertState(body));
      const { status } = res;
      if (status === '999') {
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
