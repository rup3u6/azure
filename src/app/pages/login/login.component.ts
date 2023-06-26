import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Subject,
  filter,
  finalize,
  firstValueFrom,
  takeUntil,
  tap,
} from 'rxjs';
import { CInLoginPageData } from 'src/app/core/models/authAPI/login';

// service
import { LoadingService } from 'src/app/core/services/loading.service';
import { LoginService } from 'src/app/core/services/authAPI/login.service';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
  RedirectRequest,
} from '@azure/msal-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup!: FormGroup;
  pwdVis: boolean = false;
  imgBase64: any;

  private readonly _destroying$ = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private loadingService: LoadingService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
    private router: Router,
    private msalBroadcastService: MsalBroadcastService
  ) {
    this.getValidGrphics();
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      userAccount: ['', [Validators.required]],
      userPassword: ['', [Validators.required]],
      verificatCode: ['', [Validators.required]],
    });
    this.msalBroadcastService.msalSubject$
      .pipe(
        // tap((msg: EventMessage) => console.log(msg)),
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        )
      )
      .subscribe((result: any) => {
        console.log(result);
        let idToken = result.payload.idToken;
        localStorage.setItem('wis_cms_token', String(idToken));
        this.router.navigate(['/home']);
      });

    this.broadcastService.inProgress$
      .pipe(
        // tap((status: InteractionStatus) => console.log(status)),
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        let accounts = this.authService.instance.getAllAccounts();
        if (accounts.length > 0 && localStorage.getItem('wis_cms_token')) {
          this.router.navigate(['/home']);
        }
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
    this.loadingService.startLoading();
    try {
      let res = await firstValueFrom(this.loginService.getValidGrphics());
      this.imgBase64 = await this.blobToBase64(res);
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
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

  loginAAD(event: any) {
    event.preventDefault();

    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
