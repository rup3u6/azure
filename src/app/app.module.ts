import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { MsalRedirectComponent } from '@azure/msal-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    CoreModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
