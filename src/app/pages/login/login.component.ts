import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CInLoginPageData } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  pwdVis: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userAccount: [''],
      userPassword: [''],
      verificatCode: [''],
    });
  }

  login() {
    const body: CInLoginPageData = this.loginForm.value;
    this.loginService.login(body).subscribe((res) => {
      const { status } = res;
      status === '999' && this.router.navigate(['/home']);
    });
  }
}
