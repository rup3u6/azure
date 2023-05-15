import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CInLoginPageData } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  pwdVis: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      userAccount: ['', [Validators.required]],
      userPassword: ['', [Validators.required]],
      verificatCode: ['', [Validators.required]],
    });
  }

  login() {
    // 觸發formGroup touch
    this.loginFormGroup.markAllAsTouched();
    if (!this.loginFormGroup.valid) {
      return;
    }
    const body: CInLoginPageData = this.loginFormGroup.value;
    this.loginService.login(body).subscribe();
  }

  get f() {
    return this.loginFormGroup.controls;
  }
}
