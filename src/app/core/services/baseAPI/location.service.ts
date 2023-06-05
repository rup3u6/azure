import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from '../../models/baseAPI/base';
import * as location from '../../models/baseAPI/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

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

  search(body?: location.GetRequest) {
    if (!body) {
      let { location_State } = this.searchFormValue.value;
      const status = [false, true, null];
      body = {
        ...this.searchFormValue.value,
        location_State: status[location_State],
      } as location.GetRequest;
    }

    return this.http.post<base.ResponsesBase<location.GetResponses>>(`${this.apiUrl}/Base/WfLocation/Get`, body);
  }

  add(body: location.CreateRequest) {
    return this.http.post<base.ResponsesBase<location.CreateResponses>>(`${this.apiUrl}/Base/WfLocation/Create`, body);
  }

  edit(body: location.UpdateRequest) {
    return this.http.post<base.ResponsesBase<location.UpdateResponses>>(`${this.apiUrl}/Base/WfLocation/Update`, body);
  }

  getDetail(body: location.GetDetailRequest) {
    return this.http.post<base.ResponsesBase<location.GetDetailResponses>>(`${this.apiUrl}/Base/WfLocation/GetDetail`, body);
  }

  convertState(body: location.ConvertStateRequest) {
    return this.http.post<base.ResponsesBase<location.ConvertStateResponses>>(`${this.apiUrl}/Base/WfLocation/ConvertState`, body);
  }
}
