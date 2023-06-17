import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from '../../models/base';
import * as zone from '../../models/baseAPI/zone';

@Injectable({
  providedIn: 'root',
})
export class GZoneService {

  private apiUrl = 'Base/WfZone';
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

  search(body?: zone.GetRequest) {
    if (!body) {
      let { zone_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        zone_State: status[zone_State],
      } as zone.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<zone.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  add(body: zone.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<zone.CreateResponses>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: zone.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<zone.UpdateResponses>>(`${this.apiUrl}/Update`, body);
  }

  getDetail(body: zone.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<zone.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }

  convertState(body: zone.ConvertStateRequest) {
    return this.httpService.post<base.ResponsesBase<string>>(`${this.apiUrl}/ConvertState`, body);
  }
}
