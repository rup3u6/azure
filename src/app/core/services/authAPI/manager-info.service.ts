import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MenuControlService } from '../menu-control.service';

// service
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerInfoService {

  private apiUrl = 'Auth/Login';
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
    private translateService: TranslateService,
    private menuControlService: MenuControlService,
    private httpService: HttpService,
  ) { }

  getManagerInfo() {
    return this.httpService.post<any>(`${this.apiUrl}/GetLoginInfo`)
      .pipe(
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
          // 設置管理員menu
          const menuControl = this.menuControlService.createDataLevelObj(
            0,
            this.activeZoneItem.menu ?? [],
          );
          this.menuControlService.setNormalSettingMenu(menuControl);
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
