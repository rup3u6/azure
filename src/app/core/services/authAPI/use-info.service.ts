import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from '../../models/baseAPI/base';
import * as useInfo from '../../models/authAPI/use-info';
@Injectable({
  providedIn: 'root',
})
export class UseInfoService {
  private apiUrl = environment.apiUrl;
  private tabulatorTable!: Tabulator;
  private searchFormValue = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

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
    return this.http
      .post<base.ResponsesBase<useInfo.GetResponses[]>>(
        `${this.apiUrl}/Auth/UseInfo/Get`,
        body
      )
      .pipe(map((res: any) => JSON.parse(res)));
  }

  add(body: useInfo.CreateRequest) {
    return this.http
      .post<base.ResponsesBase<useInfo.CreateResponses>>(
        `${this.apiUrl}/Auth/UseInfo/Create`,
        body
      )
      .pipe(map((res: any) => JSON.parse(res)));
  }

  edit(body: useInfo.UpdateRequest) {
    return this.http
      .post<base.ResponsesBase<useInfo.UpdateResponses>>(
        `${this.apiUrl}/Auth/UseInfo/BestowRoleAsync`,
        body
      )
      .pipe(map((res: any) => JSON.parse(res)));
  }

  getDetail(body: useInfo.GetDetailRequest) {
    return this.http
      .post<base.ResponsesBase<useInfo.GetDetailResponses>>(
        `${this.apiUrl}/Auth/UseInfo/GetDetail`,
        body
      )
      .pipe(map((res: any) => JSON.parse(res)));
  }

  convertState(body: useInfo.ConvertStateRequest) {
    return this.http
      .post<base.ResponsesBase<useInfo.ConvertStateResponses>>(
        `${this.apiUrl}/Auth/UseInfo/ConvertState`,
        body
      )
      .pipe(map((res: any) => JSON.parse(res)));
  }
}
