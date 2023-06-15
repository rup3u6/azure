import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from '../../models/base';
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
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        location_State: status[location_State],
      } as location.GetRequest;
    }

    return this.http.post<base.ResponsesBase<location.GetResponses>>(`${this.apiUrl}/Base/WfLocation/Get`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  add(body: location.CreateRequest) {
    return this.http.post<base.ResponsesBase<location.CreateResponses>>(`${this.apiUrl}/Base/WfLocation/Create`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  edit(body: location.UpdateRequest) {
    return this.http.post<base.ResponsesBase<location.UpdateResponses>>(`${this.apiUrl}/Base/WfLocation/Update`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  getDetail(body: location.GetDetailRequest) {
    return this.http.post<base.ResponsesBase<location.GetDetailResponses>>(`${this.apiUrl}/Base/WfLocation/GetDetail`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  convertState(body: location.ConvertStateRequest) {
    return this.http.post<base.ResponsesBase<string>>(`${this.apiUrl}/Base/WfLocation/ConvertState`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }
}
