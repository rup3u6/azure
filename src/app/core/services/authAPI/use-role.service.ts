import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from 'src/app/core/models/base';
import * as UseRole from 'src/app/core/models/authAPI/use-role';

@Injectable({
  providedIn: 'root'
})
export class UseRoleService {

  private apiUrl = 'Auth/UseRole';
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

  search(body?: UseRole.GetRequest) {
    if (!body) {
      let { role_State } = this.searchFormValue.value;
      const status = ['0', '1', null];
      body = {
        ...this.searchFormValue.value,
        role_State: status[+role_State],
      } as UseRole.GetRequest;
    }

    return this.httpService.post<base.ResponsesBase<UseRole.GetResponses[]>>(`${this.apiUrl}/Get`, body);
  }

  add(body: UseRole.CreateRequest) {
    return this.httpService.post<base.ResponsesBase<UseRole.CreateResponses>>(`${this.apiUrl}/Create`, body);
  }

  edit(body: UseRole.UpdateRequest) {
    return this.httpService.post<base.ResponsesBase<UseRole.UpdateResponses>>(`${this.apiUrl}/Update`, body);
  }

  getDetail(body: UseRole.GetDetailRequest) {
    return this.httpService.post<base.ResponsesBase<UseRole.GetDetailResponses>>(`${this.apiUrl}/GetDetail`, body);
  }

  convertState(body: UseRole.ConvertStateRequest) {
    return this.httpService.post<base.ResponsesBase<string>>(`${this.apiUrl}/ConvertState`, body);
  }

  getModules(body: UseRole.GetModulesRequest) {
    return this.httpService.post<base.ResponsesBase<UseRole.GetModulesResponses[]>>(`${this.apiUrl}/GetModules`, body);
  }
}
