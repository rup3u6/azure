import { NgModule } from '@angular/core';

import { GlobalSystemSettingRoutingModule } from './global-system-setting-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GLanguageComponent } from './g-language/g-language.component';

@NgModule({
  declarations: [
    GLanguageComponent
  ],
  imports: [SharedModule, GlobalSystemSettingRoutingModule],
})
export class GlobalSystemSettingModule {}
