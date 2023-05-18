import { Component } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private loginService: LoginService) {}
  logout() {
    this.loginService.logout();
  }
}
