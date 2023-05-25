import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { CInLoginPageData } from 'src/app/core/models/authAPI/login';
import { LoadingService } from 'src/app/core/services/loading.service';
import { LoginService } from 'src/app/core/services/authAPI/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  pwdVis: boolean = false;
  imgBase64: any;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private loadingService: LoadingService
  ) {
    this.getValidGrphics();
  }

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

  async getValidGrphics() {
    let res = await firstValueFrom(this.loginService.getValidGrphics());
    this.imgBase64 = await this.blobToBase64(res);
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(e.target?.result);
      };
      // readAsDataURL
      fileReader.readAsDataURL(blob);
      fileReader.onerror = () => {
        reject(new Error('blobToBase64 error'));
      };
    });
  }

  get f() {
    return this.loginFormGroup.controls;
  }
}
