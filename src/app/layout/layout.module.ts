import { NgModule } from '@angular/core';
import { DefaultComponent } from './default/default.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    SharedModule,
  ],
})
export class LayoutModule { }
