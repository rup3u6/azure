import { NgModule } from '@angular/core';

import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationComponent } from './location/location.component';
import { LocationSearchFormComponent } from './location/location-search-form/location-search-form.component';
import { LocationTableComponent } from './location/location-table/location-table.component';
import { LocationAddComponent } from './location/location-add/location-add.component';


@NgModule({
  declarations: [
    LocationComponent,
    LocationSearchFormComponent,
    LocationTableComponent,
    LocationAddComponent
  ],
  imports: [
    SharedModule,
    SystemSettingRoutingModule
  ]
})
export class SystemSettingModule { }
