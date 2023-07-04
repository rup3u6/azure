import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';
import { Message } from 'src/app/core/enum/message';

// models
import * as allowlist from 'src/app/core/models/authAPI/allowlist';

// service
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { GAllowlistService } from 'src/app/core/services/baseAPI/g-allowlist.service';

@Component({
  selector: 'app-g-allowlist',
  templateUrl: './g-allowlist.component.html',
  styleUrls: ['./g-allowlist.component.scss']
})
export class GAllowlistComponent {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    public gAllowlistService: GAllowlistService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private translateService: TranslateService,
  ) { }

  addPopupHandler() {
    this.popup.data = {
      mode: 'add',
      initData: {},
    };
    this.popup.component = 'add';
  }

  batchAddPopupHandler() {
    this.popup.data = {
      mode: 'add',
      initData: {},
    };
    this.popup.component = 'batchAdd';
  }

  batchDelectPopupHandler() {
    this.popup.data = {
      mode: 'delete',
      initData: {},
    };
    this.popup.component = 'batchAdd';
  }

  deletePopupHandler(rowData: allowlist.GetResponses) {
    this.popup.data = rowData;
    this.popup.component = 'delete';
  }

  async deleteHandler() {
    let body = {
      fk_Zone_Id: this.popup.data.fk_Zone_Id,
      zone_Name: this.popup.data.zone_Name,
      fk_Info_Jobnumber: [this.popup.data.fk_Info_Jobnumber]
    };

    this.loadingService.startLoading();

    try {
      let res = await firstValueFrom(this.gAllowlistService.delete(body));
      const { status } = res;
      if (status === ResponseStatus.執行成功) {
        let searchRes = await firstValueFrom(this.gAllowlistService.search());
        this.gAllowlistService.getTabulatorTable().setData(searchRes.data ?? []);
        this.popup.component = null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
