import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from 'src/app/core/models/base';
import * as module from 'src/app/core/models/authAPI/module';

@Injectable({
  providedIn: 'root'
})
export class GModuleService {

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

  search(body?: module.GetRequest) {
    if (!body) {
      let { mod_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        mod_State: status[mod_State],
      } as module.GetRequest;
    }

    return this.http.post<base.ResponsesBase<module.GetResponses>>(`${this.apiUrl}/Auth/SysModule/Get`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  add(body: module.CreateRequest) {
    return this.http.post<base.ResponsesBase<module.CreateResponses>>(`${this.apiUrl}/Auth/SysModule/Create`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  edit(body: module.UpdateRequest) {
    return this.http.post<base.ResponsesBase<module.UpdateResponses>>(`${this.apiUrl}/Auth/SysModule/Update`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  getDetail(body: module.GetDetailRequest) {
    return this.http.post<base.ResponsesBase<module.GetDetailResponses>>(`${this.apiUrl}/Auth/SysModule/GetDetail`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  convertState(body: module.ConvertStateRequest) {
    return this.http.post<base.ResponsesBase<string>>(`${this.apiUrl}/Auth/SysModule/ConvertState`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }
}
