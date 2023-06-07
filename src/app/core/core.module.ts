import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

// msal
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

// interceptor
import { TokenAuthHttpInterceptorService } from './interceptor/token-auth-http-interceptor.service';
import { ResponseHttpInterceptorService } from './interceptor/response-http-interceptor.service';
import { ResponseErrorHttpInterceptorService } from './interceptor/response-error-http-interceptor.service';

// components
import { LoadingComponent } from './components/loading/loading.component';
import { MessageServiceVirtualRefComponent } from './components/message-service-virtual-ref/message-service-virtual-ref.component';

// environment
import { environment } from 'src/environments/environment';

import { HttpLoaderFactory } from './translate/translation.config';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [LoadingComponent, MessageServiceVirtualRefComponent],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'EN',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
      extend: true,
    }),
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.msalClientId,
          authority: environment.msalAuthority,
          redirectUri: environment.msalRedirectUri,
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE,
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read'],
        },
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/', ['user.read']],
        ]),
      }
    ),
  ],
  exports: [LoadingComponent, MessageServiceVirtualRefComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenAuthHttpInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseHttpInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseErrorHttpInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    TranslatePipe,
  ],
})
export class CoreModule {
  constructor(protected translateService: TranslateService) {
    const currentLang = 'EN';
    translateService.use(currentLang);
  }
}
