import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';
import { CInLanguageSearch } from '../../models/baseAPI/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private apiUrl = environment.apiUrl;
  private tabulatorTable!: Tabulator;
  private searchFormValue = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

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

  search() {
    let { lang_State } = this.searchFormValue.value;
    const status = ['0', '1', null];
    let body: CInLanguageSearch = {
      ...this.searchFormValue.value,
      lang_State: status[lang_State],
    };

    return this.http.post<any>(`${this.apiUrl}/Base/WfLanguage/Get`, body);
  }

  add(body: any) {
    return this.http.post<any>(`${this.apiUrl}/Base/WfLanguage/Create`, body);
  }

  edit(body: any) {
    return this.http.post<any>(`${this.apiUrl}/Base/WfLanguage/Update`, body);
  }

  getDetail(body: any) {
    return this.http.post<any>(
      `${this.apiUrl}/Base/WfLanguage/GetDetail`,
      body
    );
  }

  convertState(body: any) {
    return this.http.post<any>(
      `${this.apiUrl}/Base/WfLanguage/ConvertState`,
      body
    );
  }
}
