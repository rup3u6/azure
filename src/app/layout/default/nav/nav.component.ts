import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuControlService } from 'src/app/core/services/menu-control.service';

@Component({
  selector: 'nav[app-nav]',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  menuList: Array<any> = [];
  constructor(
    private router: Router,
    public menuControlService: MenuControlService
  ) {}
  ngOnInit(): void {
    const currentUrl = this.router.url;
    if (currentUrl.startsWith('/globalsetting')) {
      this.menuControlService.setSideMenu('globalSetting');
    } else if (currentUrl.startsWith('/systemsetting')) {
      this.menuControlService.setSideMenu('systemSetting');
    } else {
      this.menuControlService.setSideMenu('normalSetting');
    }
  }
}
