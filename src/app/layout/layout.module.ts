import { NgModule } from '@angular/core';
import { DefaultComponent } from './default/default.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './default/header/header.component';
import { NavComponent } from './default/nav/nav.component';
import { FooterComponent } from './default/footer/footer.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
  ],
})
export class LayoutModule { }
