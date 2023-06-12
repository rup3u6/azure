import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from '../../models/baseAPI/base';
import * as language from '../../models/baseAPI/language';

@Injectable({
  providedIn: 'root'
})
export class GLanguageService {

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

  search(body?: language.GetRequest) {
    if (!body) {
      let { lang_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        lang_State: status[+lang_State],
      } as language.GetRequest;
    }

    return this.http.post<base.ResponsesBase<language.GetResponses[]>>(`${this.apiUrl}/Base/WfLanguage/Get`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  add(body: language.CreateRequest) {
    return this.http.post<base.ResponsesBase<language.CreateResponses>>(`${this.apiUrl}/Base/WfLanguage/Create`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  edit(body: language.UpdateRequest) {
    return this.http.post<base.ResponsesBase<language.UpdateResponses>>(`${this.apiUrl}/Base/WfLanguage/Update`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  getDetail(body: language.GetDetailRequest) {
    return this.http.post<base.ResponsesBase<language.GetDetailResponses>>(`${this.apiUrl}/Base/WfLanguage/GetDetail`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  convertState(body: language.ConvertStateRequest) {
    return this.http.post<base.ResponsesBase<string>>(`${this.apiUrl}/Base/WfLanguage/ConvertState`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }
}
