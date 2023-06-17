import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from '../../models/base';
import * as language from '../../models/baseAPI/language';

@Injectable({
  providedIn: 'root'
})
export class GLanguageService {

  private apiUrl = 'Base/WfLanguage';
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

  search(body?: language.GetRequest) {
    if (!body) {
      let { lang_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        lang_State: status[+lang_State],
      } as language.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<language.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  add(body: language.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<language.CreateResponses>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: language.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<language.UpdateResponses>>(`${this.apiUrl}/Update`, body);
  }

  getDetail(body: language.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<language.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }

  convertState(body: language.ConvertStateRequest) {
    return this.httpService.post<base.ResponsesBase<string>>(`${this.apiUrl}/ConvertState`, body);
  }
}
