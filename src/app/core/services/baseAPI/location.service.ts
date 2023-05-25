import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';
import { CInLocationSearch } from '../../models/baseAPI/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;
  private tabulatorTable!: Tabulator;
  private searchFormValue = new BehaviorSubject<any>({});

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
    let { location_State } = this.searchFormValue.value;
    const status = [false, true, null];
    let body: CInLocationSearch = {
      ...this.searchFormValue.value,
      location_State: status[location_State],
    };
    return this.http.post<any>(`${this.apiUrl}/Base/WfLocation/Get`, body);
  }

  add(body: any) {
    return this.http.post<any>(`${this.apiUrl}/Base/WfLocation/Create`, body);
  }

  edit(body: any) {
    return this.http.post<any>(`${this.apiUrl}/Base/WfLocation/Update`, body);
  }

  getDetail(body: any) {
    return this.http.post<any>(`${this.apiUrl}/Base/WfLocation/GetDetail`, body);
  }

  convertState(body: any) {
    return this.http.post<any>(`${this.apiUrl}/Base/WfLocation/ConvertState`, body);
  }
}
