import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from 'src/app/core/models/base';
import * as UseRole from 'src/app/core/models/authAPI/use-role';

@Injectable({
  providedIn: 'root'
})
export class UseRoleService {

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

  search(body?: UseRole.GetRequest) {
    if (!body) {
      let { role_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        role_State: status[+role_State],
      } as UseRole.GetRequest;
    }

    return this.http.post<base.ResponsesBase<UseRole.GetResponses[]>>(`${this.apiUrl}/Auth/UseRole/Get`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  add(body: UseRole.CreateRequest) {
    return this.http.post<base.ResponsesBase<UseRole.CreateResponses>>(`${this.apiUrl}/Auth/UseRole/Create`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  edit(body: UseRole.UpdateRequest) {
    return this.http.post<base.ResponsesBase<UseRole.UpdateResponses>>(`${this.apiUrl}/Auth/UseRole/Update`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  getDetail(body: UseRole.GetDetailRequest) {
    return this.http.post<base.ResponsesBase<UseRole.GetDetailResponses>>(`${this.apiUrl}/Auth/UseRole/GetDetail`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  convertState(body: UseRole.ConvertStateRequest) {
    return this.http.post<base.ResponsesBase<string>>(`${this.apiUrl}/Auth/UseRole/ConvertState`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  getModules(body: UseRole.GetModulesRequest) {
    return this.http.post<base.ResponsesBase<UseRole.GetModulesResponses[]>>(`${this.apiUrl}/Auth/UseRole/GetModules`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }
}
