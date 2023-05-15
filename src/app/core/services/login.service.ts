import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CInLoginPageData } from '../models/login';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}
  private apiUrl = environment.apiUrl;

  login(body: CInLoginPageData) {
    return this.http.post<any>(this.apiUrl + '/api/Login', body).pipe(
      tap((res) => {
        sessionStorage.setItem('wis_cms_token', res.data);
        const { status } = res;
        status === '999' && this.router.navigate(['/home']);
      })
    );
  }
  logout() {
    sessionStorage.removeItem('wis_cms_token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return sessionStorage.getItem('wis_cms_token') ?? '';
  }
}
