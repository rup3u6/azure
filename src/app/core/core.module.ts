import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenAuthHttpInterceptorService } from './interceptor/token-auth-http-interceptor.service';
import { ResponseHttpInterceptorService } from './interceptor/response-http-interceptor.service';
import {
  TranslateModule,
  TranslateLoader,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { HttpLoaderFactory } from './translate/translation.config';
import { ResponseErrorHttpInterceptorService } from './interceptor/response-error-http-interceptor.service';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
    }),
  ],
  exports: [LoadingComponent],
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
    TranslatePipe,
  ],
})
export class CoreModule {
  constructor(protected translateService: TranslateService) {
    const currentLang = 'EN';
    translateService.use(currentLang);
  }
}
