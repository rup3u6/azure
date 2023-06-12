import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from '../../models/baseAPI/base';
import * as moduleClass from '../../models/authAPI/module-class';

@Injectable({
  providedIn: 'root'
})
export class GModuleClassService {

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

  search(body?: moduleClass.GetRequest) {
    if (!body) {
      let { modClass_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        modClass_State: status[modClass_State],
      } as moduleClass.GetRequest;
    }

    return this.http.post<base.ResponsesBase<moduleClass.GetResponses>>(`${this.apiUrl}/Auth/SysModuleClass/Get`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  add(body: moduleClass.CreateRequest) {
    return this.http.post<base.ResponsesBase<moduleClass.CreateResponses>>(`${this.apiUrl}/Auth/SysModuleClass/Create`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  edit(body: moduleClass.UpdateRequest) {
    return this.http.post<base.ResponsesBase<moduleClass.UpdateResponses>>(`${this.apiUrl}/Auth/SysModuleClass/Update`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  getDetail(body: moduleClass.GetDetailRequest) {
    return this.http.post<base.ResponsesBase<moduleClass.GetDetailResponses>>(`${this.apiUrl}/Auth/SysModuleClass/GetDetail`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  convertState(body: moduleClass.ConvertStateRequest) {
    return this.http.post<base.ResponsesBase<string>>(`${this.apiUrl}/Auth/SysModuleClass/ConvertState`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }
}
