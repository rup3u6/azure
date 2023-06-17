import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from '../../models/base';
import * as useInfo from '../../models/authAPI/use-info';

@Injectable({
  providedIn: 'root',
})
export class UseInfoService {

  private apiUrl = 'Auth/UseInfo';
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

  search(body?: useInfo.GetRequest) {
    if (!body) {
      let { lang_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        lang_State: status[+lang_State],
      } as useInfo.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<useInfo.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  add(body: useInfo.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<useInfo.CreateResponses>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: useInfo.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<useInfo.UpdateResponses>>(`${this.apiUrl}/BestowRoleAsync`, body);
  }

  getDetail(body: useInfo.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<useInfo.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }

  convertState(body: useInfo.ConvertStateRequest) {
    return this.httpService.post<base.ResponsesBase<useInfo.ConvertStateResponses>>(`${this.apiUrl}/ConvertState`, body);
  }
}
