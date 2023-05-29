import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/authAPI/login.service';
import { MenuControlService } from 'src/app/core/services/menu-control.service';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public router: Router,
    private loginService: LoginService,
    public menuControlService: MenuControlService
  ) {}
  logout() {
    this.loginService.logout();
  }
}
