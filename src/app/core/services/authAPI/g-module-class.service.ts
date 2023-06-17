import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from '../../models/base';
import * as moduleClass from '../../models/authAPI/module-class';

@Injectable({
  providedIn: 'root'
})
export class GModuleClassService {

  private apiUrl = 'Auth/SysModuleClass';
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

  search(body?: moduleClass.GetRequest) {
    if (!body) {
      let { modClass_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        modClass_State: status[modClass_State],
      } as moduleClass.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<moduleClass.GetResponses>>(`${this.apiUrl}/Get`, body);
  }

  add(body: moduleClass.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<moduleClass.CreateResponses>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: moduleClass.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<moduleClass.UpdateResponses>>(`${this.apiUrl}/Update`, body);
  }

  getDetail(body: moduleClass.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<moduleClass.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }

  convertState(body: moduleClass.ConvertStateRequest) {
    return this.httpService.post<base.ResponsesBase<string>>(`${this.apiUrl}/ConvertState`, body);
  }
}
