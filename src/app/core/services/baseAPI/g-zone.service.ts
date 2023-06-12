import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from '../../models/baseAPI/base';
import * as zone from '../../models/baseAPI/zone';

@Injectable({
  providedIn: 'root',
})
export class GZoneService {

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

  search(body?: zone.GetRequest) {
    if (!body) {
      let { zone_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        zone_State: status[zone_State],
      } as zone.GetRequest;
    }

    return this.http.post<base.ResponsesBase<zone.GetResponses>>(`${this.apiUrl}/Base/WfZone/Get`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  add(body: zone.CreateRequest) {
    return this.http.post<base.ResponsesBase<zone.CreateResponses>>(`${this.apiUrl}/Base/WfZone/Create`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  edit(body: zone.UpdateRequest) {
    return this.http.post<base.ResponsesBase<zone.UpdateResponses>>(`${this.apiUrl}/Base/WfZone/Update`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  getDetail(body: zone.GetDetailRequest) {
    return this.http.post<base.ResponsesBase<zone.GetDetailResponses>>(`${this.apiUrl}/Base/WfZone/GetDetail`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }

  convertState(body: zone.ConvertStateRequest) {
    return this.http.post<base.ResponsesBase<string>>(`${this.apiUrl}/Base/WfZone/ConvertState`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }
}
