import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
  public activeZoneItem: any = {};

  //  區域選單，含可選用語系及可使用的menu
  public zoneList = [];

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {}

  getManagerInfo() {
    return this.http
      .post<any>(`${this.apiUrl}/Auth/Login/GetLoginInfo`, null)
      .pipe(
        map((res: any) => JSON.parse(res)),
        tap((res) => {
          const { name, jobNumber, isGlobal, isBackend, zones } = res.data;
          this.managerName = name;
          this.managerJobNumber = jobNumber;
          this.isGlobal = isGlobal;
          this.isBackend = isBackend;
          this.zoneList = zones;
          this.activeZoneItem =
            zones.find((zoneItem: any) => zoneItem.isDefault === '1') ?? {};
          //  若無預設語言則以英文為主
          const defaultLanguage =
            this.activeZoneItem.lang.find(
              (langItem: any) => langItem.isDefault === '1'
            )?.langCode ?? 'en';
          //  對應語系檔案名稱規則：langCode + '_b'， en -> en_b
          setTimeout(() => {
            this.translateService.use(`${defaultLanguage}_b`);
          });
        })
      );
  }

  clearManagerInfo() {
    this.managerName = '';
    this.managerJobNumber = '';
    this.isGlobal = '0';
    this.isBackend = '0';
    this.activeZoneItem = {};
    this.zoneList = [];
  }

  get activeLangList() {
    return (
      this.zoneList.find(
        (zoneItem: any) => zoneItem.zoneId === this.activeZoneItem.zoneId
      )?.['lang'] ?? []
    );
  }
}
