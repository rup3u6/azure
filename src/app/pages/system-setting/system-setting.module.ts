import { NgModule } from '@angular/core';

import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { CompanyComponent } from './company/company.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyAddComponent } from './company/company-add/company-add.component';


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyAddComponent
  ],
  imports: [
    SharedModule,
    SystemSettingRoutingModule
  ]
})
export class SystemSettingModule { }
