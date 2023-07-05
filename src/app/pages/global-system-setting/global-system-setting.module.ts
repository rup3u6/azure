import { NgModule } from '@angular/core';
import { GlobalSystemSettingRoutingModule } from './global-system-setting-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// component
import { GLanguageComponent } from './g-language/g-language.component';
import { GLanguageAddComponent } from './g-language/g-language-add/g-language-add.component';
import { GLanguageSearchFormComponent } from './g-language/g-language-search-form/g-language-search-form.component';
import { GLanguageTableComponent } from './g-language/g-language-table/g-language-table.component';
import { GZoneComponent } from './g-zone/g-zone.component';
import { GZoneAddComponent } from './g-zone/g-zone-add/g-zone-add.component';
import { GZoneAddPermissionComponent } from './g-zone/g-zone-add-permission/g-zone-add-permission.component';
import { GZoneSearchFormComponent } from './g-zone/g-zone-search-form/g-zone-search-form.component';
import { GZoneTableComponent } from './g-zone/g-zone-table/g-zone-table.component';
import { GModuleClassComponent } from './g-module-class/g-module-class.component';
import { GModuleClassAddComponent } from './g-module-class/g-module-class-add/g-module-class-add.component';
import { GModuleClassSearchFormComponent } from './g-module-class/g-module-class-search-form/g-module-class-search-form.component';
import { GModuleClassTableComponent } from './g-module-class/g-module-class-table/g-module-class-table.component';
import { GModuleComponent } from './g-modul/g-module.component';
import { GModuleAddComponent } from './g-modul/g-modul-add/g-module-add.component';
import { GModuleSearchFormComponent } from './g-modul/g-module-search-form/g-module-search-form.component';
import { GModuleTableComponent } from './g-modul/g-module-table/g-module-table.component';
import { GAllowlistComponent } from './g-allowlist/g-allowlist.component';
import { GAllowlistAddComponent } from './g-allowlist/g-allowlist-add/g-allowlist-add.component';
import { GAllowlistBatchAddComponent } from './g-allowlist/g-allowlist-batch-add/g-allowlist-batch-add.component';
import { GAllowlistSearchFormComponent } from './g-allowlist/g-allowlist-search-form/g-allowlist-search-form.component';
import { GAllowlistTableComponent } from './g-allowlist/g-allowlist-table/g-allowlist-table.component';
import { GDistrictManagerComponent } from './g-district-manager/g-district-manager.component';
import { GDistrictManagerAddComponent } from './g-district-manager/g-district-manager-add/g-district-manager-add.component';
import { GDistrictManagerSearchFormComponent } from './g-district-manager/g-district-manager-search-form/g-district-manager-search-form.component';
import { GDistrictManagerTableComponent } from './g-district-manager/g-district-manager-zone-table/g-district-manager-table.component';

@NgModule({
  declarations: [
    GLanguageComponent,
    GLanguageAddComponent,
    GLanguageSearchFormComponent,
    GLanguageTableComponent,
    GZoneComponent,
    GZoneAddComponent,
    GZoneAddPermissionComponent,
    GZoneSearchFormComponent,
    GZoneTableComponent,
    GModuleClassComponent,
    GModuleClassAddComponent,
    GModuleClassSearchFormComponent,
    GModuleClassTableComponent,
    GModuleComponent,
    GModuleAddComponent,
    GModuleSearchFormComponent,
    GModuleTableComponent,
    GAllowlistComponent,
    GAllowlistAddComponent,
    GAllowlistBatchAddComponent,
    GAllowlistSearchFormComponent,
    GAllowlistTableComponent,
    GDistrictManagerComponent,
    GDistrictManagerAddComponent,
    GDistrictManagerSearchFormComponent,
    GDistrictManagerTableComponent,
  ],
  imports: [SharedModule, GlobalSystemSettingRoutingModule],
})
export class GlobalSystemSettingModule { }
