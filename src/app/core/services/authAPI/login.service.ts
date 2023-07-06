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

// service
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpService: HttpService,
    private router: Router,
    private authService: MsalService,
    private managerInfoService: ManagerInfoService,
  ) { }

  private apiUrl = 'Auth/Login';
  private requestId = ''; //  驗證碼請求id

  login(body: CInLoginPageData) {
    body.requestId = this.requestId;
    return this.httpService.post<any>(`${this.apiUrl}`, body)
      .pipe(
        tap((res) => {
          localStorage.setItem('wis_cms_token', res.data);
          const { status } = res;
          status === ResponseStatus.執行成功 && this.router.navigate(['/home']);
        })
      );
  }

  logout() {
    localStorage.removeItem('wis_cms_token');
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
    this.requestId = this.uuidv4();
    return this.httpService.post_blob(`${this.apiUrl}/GetValidGrphics`, { sRequestId: this.requestId })
  }

  getToken() {
    return localStorage.getItem('wis_cms_token') ?? '';
  }

  uuidv4() {
    return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}
