import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from 'src/app/core/models/base';
import * as module from 'src/app/core/models/authAPI/module';

@Injectable({
  providedIn: 'root'
})
export class GModuleService {

  private apiUrl = 'Auth/SysModule';
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

  search(body?: module.GetRequest) {
    if (!body) {
      let { mod_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        mod_State: status[mod_State],
      } as module.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<module.GetResponses>>(`${this.apiUrl}/Get`, body);
  }

  add(body: module.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<module.CreateResponses>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: module.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<module.UpdateResponses>>(`${this.apiUrl}/Update`, body);
  }

  getDetail(body: module.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<module.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }

  convertState(body: module.ConvertStateRequest) {
    return this.httpService.post<base.ResponsesBase<string>>(`${this.apiUrl}/ConvertState`, body);
  }
}
