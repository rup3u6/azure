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
import { UseInfoComponent } from './use-info/use-info.component';
import { UseInfoSearchFormComponent } from './use-info/use-info-search-form/use-info-search-form.component';
import { UseInfoTableComponent } from './use-info/use-info-table/use-info-table.component';
import { UseInfoAddComponent } from './use-info/use-info-add/use-info-add.component';
import { UseRoleComponent } from './use-role/use-role.component';
import { UseRoleAddComponent } from './use-role/use-role-add/use-role-add.component';
import { UseRoleSearchFormComponent } from './use-role/use-role-search-form/use-role-search-form.component';
import { UseRoleTableComponent } from './use-role/use-role-table/use-role-table.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { SecretaryAddComponent } from './secretary/secretary-add/secretary-add.component';
import { SecretarySearchFormComponent } from './secretary/secretary-search-form/secretary-search-form.component';
import { SecretaryTableComponent } from './secretary/secretary-table/secretary-table.component';

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
    UseInfoComponent,
    UseInfoSearchFormComponent,
    UseInfoTableComponent,
    UseInfoAddComponent,
    UseRoleComponent,
    UseRoleAddComponent,
    UseRoleSearchFormComponent,
    UseRoleTableComponent,
    SecretaryComponent,
    SecretaryAddComponent,
    SecretarySearchFormComponent,
    SecretaryTableComponent,
  ],
  imports: [
    SharedModule,
    SystemSettingRoutingModule
  ]
})
export class SystemSettingModule { }
