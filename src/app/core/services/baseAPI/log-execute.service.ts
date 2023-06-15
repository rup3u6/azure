import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from '../../models/base';
import * as logExecute from '../../models/baseAPI/log-execute';

@Injectable({
  providedIn: 'root',
})
export class LogExecuteService {

  private apiUrl = environment.apiUrl;
  private tabulatorTable!: Tabulator;
  private searchFormValue = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) { }

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

    return this.http
    .post<base.ResponsesBase<logExecute.GetResponses[]>>(
      `${this.apiUrl}/Base/SysLogExecute/Get`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  getDetail(body: logExecute.GetDetailRequest) {
    return this.http.post<base.ResponsesBase<logExecute.GetDetailResponses>>(`${this.apiUrl}/Base/SysLogExecute/GetDetail`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }
}
