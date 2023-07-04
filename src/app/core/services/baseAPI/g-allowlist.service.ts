import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from 'src/app/core/models/base';
import * as allowlist from 'src/app/core/models/authAPI/allowlist';

@Injectable({
  providedIn: 'root'
})
export class GAllowlistService {

  private apiUrl = 'Base/WfWList';
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

  search(body?: allowlist.GetRequest) {
    if (!body) {
      let { zone_Id } = this.searchFormValue.value;
      body = {
        ...this.searchFormValue.value,
        zone_Id: zone_Id === '0' ? null : zone_Id,
      } as allowlist.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<allowlist.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  add(body: allowlist.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<number>>(`${this.apiUrl}/Create`, body);
  }

  delete(body: allowlist.DeleteRequest) {
    return this.httpService.post<base.ResponsesBase<number>>(`${this.apiUrl}/Delete`, body);
  }
}
