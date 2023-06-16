import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CInLoginPageData } from '../../models/authAPI/login';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MsalService } from '@azure/msal-angular';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';
import { ManagerInfoService } from './manager-info.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: MsalService,
    private managerInfoService: ManagerInfoService
  ) {}

  private apiUrl = environment.apiUrl;

  login(body: CInLoginPageData) {
    return this.http.post<any>(`${this.apiUrl}/Auth/Login`, body).pipe(
      map((res: any) => JSON.parse(res)),
      tap((res) => {
        sessionStorage.setItem('wis_cms_token', res.data);
        const { status } = res;
        status === ResponseStatus.執行成功 && this.router.navigate(['/home']);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('wis_cms_token');
    this.managerInfoService.clearManagerInfo();
    let accounts = this.authService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.authService.logoutRedirect({
        postLogoutRedirectUri: environment.msalRedirectUri,
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  getValidGrphics() {
    return this.http.post<Blob>(
      `${this.apiUrl}/Auth/Login/GetValidGrphics`,
      null,
      {
        responseType: 'blob' as 'json',
      }
    );
  }

  getToken() {
    return sessionStorage.getItem('wis_cms_token') ?? '';
  }
}
