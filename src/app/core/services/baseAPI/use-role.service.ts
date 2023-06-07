import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from '../../models/baseAPI/base';
import * as UseRole from '../../models/baseAPI/useRole';

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

    return this.http.post<base.ResponsesBase<UseRole.GetResponses[]>>(`${this.apiUrl}/Auth/UseRole/Get`, body);
  }

  add(body: UseRole.CreateRequest) {
    return this.http.post<base.ResponsesBase<UseRole.CreateResponses>>(`${this.apiUrl}/Auth/UseRole/Create`, body);
  }

  edit(body: UseRole.UpdateRequest) {
    return this.http.post<base.ResponsesBase<UseRole.UpdateResponses>>(`${this.apiUrl}/Auth/UseRole/Update`, body);
  }

  getDetail(body: UseRole.GetDetailRequest) {
    return this.http.post<base.ResponsesBase<UseRole.GetDetailResponses>>(`${this.apiUrl}/Auth/UseRole/GetDetail`, body);
  }

  convertState(body: UseRole.ConvertStateRequest) {
    return this.http.post<base.ResponsesBase<string>>(`${this.apiUrl}/Auth/UseRole/ConvertState`, body);
  }
}
