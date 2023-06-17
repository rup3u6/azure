import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from '../../models/base';
import * as secretary from '../../models/secretaryAPI/secretary';

@Injectable({
  providedIn: 'root',
})
export class SecretaryService {

  private apiUrl = 'Secretary/WfSecretary';
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

  search(body?: secretary.GetRequest) {
    if (!body) {
      body = {
        ...this.searchFormValue.value,
      } as secretary.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<secretary.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  add(body: secretary.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<secretary.CreateResponses>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: secretary.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<secretary.UpdateResponses>>(`${this.apiUrl}/Update`, body);
  }

  getDetail(body: secretary.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<secretary.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }
}
