import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';
import { CInZoneSearch } from '../../models/baseAPI/zone';

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

  search(body?: CInZoneSearch) {
    if (!body) {
      let { zone_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        zone_State: status[zone_State],
      } as CInZoneSearch;
    }

    return this.http.post<any>(`${this.apiUrl}/Base/WfZone/Get`, body);
  }

  add(body: any) {
    return this.http.post<any>(`${this.apiUrl}/Base/WfZone/Create`, body);
  }

  edit(body: any) {
    return this.http.post<any>(`${this.apiUrl}/Base/WfZone/Update`, body);
  }

  getDetail(body: any) {
    return this.http.post<any>(
      `${this.apiUrl}/Base/WfZone/GetDetail`,
      body
    );
  }

  convertState(body: any) {
    return this.http.post<any>(
      `${this.apiUrl}/Base/WfZone/ConvertState`,
      body
    );
  }
}
