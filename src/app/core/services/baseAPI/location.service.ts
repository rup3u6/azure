import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from '../../models/base';
import * as location from '../../models/baseAPI/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  private apiUrl = 'Base/WfLocation';
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

  search(body?: location.GetRequest) {
    if (!body) {
      let { location_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        location_State: status[location_State],
      } as location.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<location.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  add(body: location.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<location.CreateResponses>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: location.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<location.UpdateResponses>>(`${this.apiUrl}/Update`, body);
  }

  getDetail(body: location.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<location.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }

  convertState(body: location.ConvertStateRequest) {
    return this.httpService.post<base.ResponsesBase<string>>(`${this.apiUrl}/ConvertState`, body);
  }
}
