import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../http.service';

// models
import * as base from '../../models/base';
import * as DistrictManager from '../../models/authAPI/district-manager';

@Injectable({
  providedIn: 'root',
})
export class GDistrictManagerService {

  private apiUrl = 'Base/WfDistrictManager';
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

  search(body?: DistrictManager.GetRequest) {
    if (!body) {
      let { fk_Zone_Id, fk_Info_Id } = this.searchFormValue.value;
      body = {
        fk_Zone_Id: fk_Zone_Id === 0 ? null : fk_Zone_Id,
        fk_Info_Id: fk_Info_Id === 0 ? null : fk_Info_Id,
      } as DistrictManager.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<DistrictManager.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  add(body: DistrictManager.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<string>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: DistrictManager.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<number>>(`${this.apiUrl}/Update`, body);
  }

  getDetail(body: DistrictManager.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<DistrictManager.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }

  delete(body: DistrictManager.DeleteRequest[]) {
    return this.httpService.post<base.ResponsesBase<number>>(`${this.apiUrl}/Delete`, body);
  }
}
