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
import { GZoneSearchFormComponent } from './g-zone/g-zone-search-form/g-zone-search-form.component';
import { GZoneTableComponent } from './g-zone/g-zone-table/g-zone-table.component';

@NgModule({
  declarations: [
    GLanguageComponent,
    GLanguageAddComponent,
    GLanguageSearchFormComponent,
    GLanguageTableComponent,
    GZoneComponent,
    GZoneAddComponent,
    GZoneSearchFormComponent,
    GZoneTableComponent,
  ],
  imports: [SharedModule, GlobalSystemSettingRoutingModule],
})
export class GlobalSystemSettingModule { }
