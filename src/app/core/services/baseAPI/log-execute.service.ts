import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from '../../models/base';
import * as logExecute from '../../models/baseAPI/log-execute';

@Injectable({
  providedIn: 'root',
})
export class LogExecuteService {

  private apiUrl = 'Base/SysLogExecute';
  private tabulatorTable!: Tabulator;
  private searchFormValue = new BehaviorSubject<any>({});

  constructor(private httpService: HttpService) { }

  tableBuilded(table: Tabulator) {
    this.tabulatorTable = table;
  }

  getTabulatorTable() {
    return this.tabulatorTable;
  }

  setSearchFormValue(value: any) {
    this.searchFormValue.next(value);
  }

  getSearchFormValue() {
    return this.searchFormValue.asObservable();
  }

  search(body?: logExecute.GetRequest) {
    if (!body) {
      let { logExec_CreateCode } = this.searchFormValue.value;
      body = {
        ...this.searchFormValue.value,
        logExec_CreateCode: logExec_CreateCode === '0' ? null : logExec_CreateCode,
      } as logExecute.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<logExecute.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  getDetail(body: logExecute.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<logExecute.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }
}
