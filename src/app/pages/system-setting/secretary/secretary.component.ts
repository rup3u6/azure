import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// service
import { SecretaryService } from 'src/app/core/services/secretaryAPI/secretary.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    public secretaryService: SecretaryService,
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
      fk_Info_Id: rowData.fk_Info_Id,
      pk_Secretary: rowData.pk_Secretary,
    };
    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.secretaryService.getDetail(body));
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
}
