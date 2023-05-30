import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';
import { CInLogExecuteSearch } from 'src/app/core/models/baseAPI/log-execute';


@Injectable({
  providedIn: 'root',
})
export class LogExecuteService {

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

  search(init = false) {
    let body = {};

    if (!init) {
      let { logExec_CreateCode } = this.searchFormValue.value;
      body = {
        ...this.searchFormValue.value,
        logExec_CreateCode: logExec_CreateCode === '0' ? null : logExec_CreateCode,
      } as CInLogExecuteSearch;
    }

    return this.http.post<any>(`${this.apiUrl}/Base/SysLogExecute/Get`, body);
  }

  getDetail(body: any) {
    return this.http.post<any>(
      `${this.apiUrl}/Base/SysLogExecute/GetDetail`,
      body
    );
  }
}
