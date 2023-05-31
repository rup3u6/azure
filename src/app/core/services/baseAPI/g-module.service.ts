import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';
import { CInModuleClassSearch } from '../../models/baseAPI/module-class';

@Injectable({
  providedIn: 'root'
})
export class GModuleService {

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

  search(body?: CInModuleClassSearch) {
    if (!body) {
      let { mod_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        mod_State: status[mod_State],
      } as CInModuleClassSearch;
    }

    return this.http.post<any>(`${this.apiUrl}/Auth/SysModule/Get`, body);
  }

  add(body: any) {
    return this.http.post<any>(`${this.apiUrl}/Auth/SysModule/Create`, body);
  }

  edit(body: any) {
    return this.http.post<any>(`${this.apiUrl}/Auth/SysModule/Update`, body);
  }

  getDetail(body: any) {
    return this.http.post<any>(
      `${this.apiUrl}/Auth/SysModule/GetDetail`,
      body
    );
  }

  convertState(body: any) {
    return this.http.post<any>(
      `${this.apiUrl}/Auth/SysModule/ConvertState`,
      body
    );
  }
}
