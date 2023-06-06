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
import { MessageServiceVirtualRefComponent } from './components/message-service-virtual-ref/message-service-virtual-ref.component';
import { CommonModule } from '@angular/common';

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
    TranslatePipe,
  ],
})
export class CoreModule {
  constructor(protected translateService: TranslateService) {
    const currentLang = 'EN';
    translateService.use(currentLang);
  }
}
