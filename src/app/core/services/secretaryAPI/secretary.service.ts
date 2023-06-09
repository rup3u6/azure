import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from '../../models/baseAPI/base';
import * as secretary from '../../models/secretaryAPI/secretary';

@Injectable({
  providedIn: 'root',
})
export class SecretaryService {

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

  search(body?: secretary.GetRequest) {
    if (!body) {
      body = {
        ...this.searchFormValue.value,
      } as secretary.GetRequest;
    }

    return this.http.post<base.ResponsesBase<secretary.GetResponses>>(`${this.apiUrl}/Secretary/WfSecretary/Get`, body);
  }

  add(body: secretary.CreateRequest) {
    return this.http.post<base.ResponsesBase<secretary.CreateResponses>>(`${this.apiUrl}/Secretary/WfSecretary/Create`, body);
  }

  edit(body: secretary.UpdateRequest) {
    return this.http.post<base.ResponsesBase<secretary.UpdateResponses>>(`${this.apiUrl}/Secretary/WfSecretary/Update`, body);
  }

  getDetail(body: secretary.GetDetailRequest) {
    return this.http.post<base.ResponsesBase<secretary.GetDetailResponses>>(`${this.apiUrl}/Secretary/WfSecretary/GetDetail`, body);
  }
}
