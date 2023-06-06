import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tabulator } from 'tabulator-tables';

// models
import * as base from '../../models/baseAPI/base';
import * as useInfo from '../../models/baseAPI/use-info';

@Injectable({
  providedIn: 'root'
})
export class DropDownListService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(sCodeList: string) {
    const body = { sCodeList };

    return this.http.post<base.ResponsesBase<any[]>>(`${this.apiUrl}/Base/DropDownList`, body);
  }
}
