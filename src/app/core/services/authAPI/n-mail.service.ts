import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from '../../models/base';
import * as mail from '../../models/authAPI/mail';

@Injectable({
  providedIn: 'root',
})
export class NMailService {

  private apiUrl = 'Base/WfMail';
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

  search(body?: mail.GetRequest) {
    if (!body) {
      let { mail_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        mail_State: status[mail_State],
      } as mail.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<mail.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  add(body: mail.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<mail.CreateResponses>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: mail.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<mail.UpdateResponses>>(`${this.apiUrl}/Update`, body);
  }

  getDetail(body: mail.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<mail.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }

  convertState(body: mail.ConvertStateRequest) {
    return this.httpService.post<base.ResponsesBase<string>>(`${this.apiUrl}/ConvertState`, body);
  }
}
