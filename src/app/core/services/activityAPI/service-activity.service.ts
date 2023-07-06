import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from 'src/app/core/models/base';
import * as serviceActivity from 'src/app/core/models/activityAPI/service-activity';

@Injectable({
  providedIn: 'root'
})
export class ServiceActivityService {

  private apiUrl = 'Activity/WfServiceActiviti';
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

  search(body?: serviceActivity.GetRequest) {
    if (!body) {
      let { zone_Id } = this.searchFormValue.value;
      body = {
        ...this.searchFormValue.value,
        zone_Id: zone_Id === '0' ? null : zone_Id,
      } as serviceActivity.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<serviceActivity.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  add(body: serviceActivity.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<number>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: serviceActivity.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<number>>(`${this.apiUrl}/Update`, body);
  }

  getDetail(body: serviceActivity.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<serviceActivity.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }
}
