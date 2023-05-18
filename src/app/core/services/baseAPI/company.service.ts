import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CInCompanyPageData, CInCompanySearch } from '../../models/baseAPI/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  search(body: CInCompanySearch) {
    return this.http.post<any>(this.apiUrl + '/Base/WfCompany/Get', body);
  }
  add(body: CInCompanyPageData) {
    return this.http.post<any>(this.apiUrl + '/Base/WfCompany/Create', body);
  }
}
