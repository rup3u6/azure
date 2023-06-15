import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    public router: Router,
    private loginService: LoginService,
    public menuControlService: MenuControlService,
    public managerInfoService: ManagerInfoService
  ) {}

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
}
