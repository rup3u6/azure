import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

// service
import { LoginService } from 'src/app/core/services/authAPI/login.service';
import { ManagerInfoService } from 'src/app/core/services/authAPI/manager-info.service';
import { MenuControlService } from 'src/app/core/services/menu-control.service';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isUserLinkNav = false;
  currentLang = '';
  constructor(
    public router: Router,
    private loginService: LoginService,
    public menuControlService: MenuControlService,
    public managerInfoService: ManagerInfoService,
    public translateService: TranslateService
  ) {
    this.currentLang = translateService.currentLang;
    // 語言切換後取得新的欄位名稱
    translateService.store.onLangChange.subscribe((lang: LangChangeEvent) => {
      this.currentLang = lang.lang;
    });
  }

  @HostListener('window:click', ['$event'])
  onClick(_event: any) {
    this.isUserLinkNav = false;
  }

  logout() {
    this.loginService.logout();
  }

  userLinkNavClick(event: any) {
    event.stopPropagation();

    this.isUserLinkNav = !this.isUserLinkNav;
  }

  changeLang(event: any) {
    this.translateService.use(event.target.value);
  }
}
