import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CInLoginPageData } from 'src/app/core/models/authAPI/login';
import { LoadingService } from 'src/app/core/services/loading.service';
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
    private loginService: LoginService,
    private loadingService: LoadingService
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
    this.loadingService.startLoading();
    const body: CInLoginPageData = this.loginFormGroup.value;
    this.loginService
      .login(body)
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe();
  }

  get f() {
    return this.loginFormGroup.controls;
  }
}
