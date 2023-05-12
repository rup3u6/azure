import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenAuthHttpInterceptorService } from './interceptor/token-auth-http-interceptor.service';
import { ResponseHttpInterceptorService } from './interceptor/response-http-interceptor.service';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ApplicationInitializerFactory, HttpLoaderFactory } from './translate/translation.config';
import { ResponseErrorHttpInterceptorService } from './interceptor/response-error-http-interceptor.service';

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'zh',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ApplicationInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
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
  ],
})
export class CoreModule {}
