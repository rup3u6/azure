import { NgModule } from '@angular/core';
import { GlobalSystemSettingRoutingModule } from './global-system-setting-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// component
import { GLanguageComponent } from './g-language/g-language.component';
import { GLanguageAddComponent } from './g-language/g-language-add/g-language-add.component';
import { GLanguageSearchFormComponent } from './g-language/g-language-search-form/g-language-search-form.component';
import { GLanguageTableComponent } from './g-language/g-language-table/g-language-table.component';
import { ZoneComponent } from './zone/zone.component';
import { ZoneAddComponent } from './zone/zone-add/zone-add.component';
import { ZoneSearchFormComponent } from './zone/zone-search-form/zone-search-form.component';
import { ZoneTableComponent } from './zone/zone-table/zone-table.component';

@NgModule({
  declarations: [
    GLanguageComponent,
    GLanguageAddComponent,
    GLanguageSearchFormComponent,
    GLanguageTableComponent,
    ZoneComponent,
    ZoneAddComponent,
    ZoneSearchFormComponent,
    ZoneTableComponent,
  ],
  imports: [SharedModule, GlobalSystemSettingRoutingModule],
})
export class GlobalSystemSettingModule { }
