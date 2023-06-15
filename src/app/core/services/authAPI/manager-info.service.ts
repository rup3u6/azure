import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerInfoService {
  private apiUrl = environment.apiUrl;
  public managerName = '';
  public managerJobNumber = '';

  //  權限：全域管理者 > 區域管理者 > 區域管理員
  //  全域管理員具有區域管理者權限
  public isGlobal = '0';

  //  區域管理者可使用該區域管理員所有功能(menu)
  public isBackend = '0';
  private activeZoneId = '';

  //  區域選單，含可選用語系及可使用的menu
  private zoneList = [];

  constructor(private http: HttpClient, private loginService: LoginService) {}

  async getManagerInfo() {
    const token = this.loginService.getToken();
    // this.http.post<any>(`${this.apiUrl}/Auth/Login`, {token}).pipe(
    //   map((res: any) => JSON.parse(res)),
    //   tap((res) => {
    //     sessionStorage.setItem('wis_cms_token', res.data);
    //     const { status } = res;
    //     status === '999' && this.router.navigate(['/home']);
    //   })
    // );
    this.managerName = 'Allen Lin';
    this.managerJobNumber = 'ABC13579';
    this.isGlobal = '1';
    this.isBackend = '1';
  }
}
