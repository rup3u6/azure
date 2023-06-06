import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// services
import { LogExecuteService } from 'src/app/core/services/baseAPI/log-execute.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-log-execute',
  templateUrl: './log-execute.component.html',
  styleUrls: ['./log-execute.component.scss']
})
export class LogExecuteComponent {

  popup: any = {
    component: null,
    data: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    public logExecuteService: LogExecuteService,
    private loadingService: LoadingService
  ) { }

  async detailPopupHandler(rowData: any) {
    let body = {
      logExec_Id: rowData.logExec_Id,
    };
    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.logExecuteService.getDetail(body));
      const { status } = res;
      if (status !== '999') {
        return;
      }
      this.popup.data = {
        mode: '',
        initData: res.data,
      };
      this.popup.component = 'detail';
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
