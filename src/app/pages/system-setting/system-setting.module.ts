import { NgModule } from '@angular/core';
import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// component
import { LocationComponent } from './location/location.component';
import { LocationSearchFormComponent } from './location/location-search-form/location-search-form.component';
import { LocationTableComponent } from './location/location-table/location-table.component';
import { LocationAddComponent } from './location/location-add/location-add.component';
import { LogExecuteComponent } from './log-execute/log-execute.component';
import { LogExecuteTableComponent } from './log-execute/log-execute-table/log-execute-table.component';
import { LogExecuteSearchFormComponent } from './log-execute/log-execute-search-form/log-execute-search-form.component';
import { LogExecuteDetailComponent } from './log-execute/log-execute-detail/log-execute-detail.component';


@NgModule({
  declarations: [
    LocationComponent,
    LocationSearchFormComponent,
    LocationTableComponent,
    LocationAddComponent,
    LogExecuteComponent,
    LogExecuteTableComponent,
    LogExecuteSearchFormComponent,
    LogExecuteDetailComponent,
  ],
  imports: [
    SharedModule,
    SystemSettingRoutingModule
  ]
})
export class SystemSettingModule { }
