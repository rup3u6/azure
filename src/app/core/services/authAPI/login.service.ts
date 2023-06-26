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
  private requestId = ''; //  驗證碼請求id

  login(body: CInLoginPageData) {
    body.requestId = this.requestId;
    return this.http.post<any>(`${this.apiUrl}/Auth/Login`, body).pipe(
      map((res: any) => JSON.parse(res)),
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
    return this.http.post<Blob>(
      `${this.apiUrl}/Auth/Login/GetValidGrphics`,
      { sRequestId: this.requestId },
      {
        responseType: 'blob' as 'json',
      }
    );
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
