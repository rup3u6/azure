import { NgModule } from '@angular/core';
import { NormalSettingRoutingModule } from './normal-setting-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// component
import { NMailComponent } from './n-mail/n-mail.component';
import { NMailAddComponent } from './n-mail/n-mail-add/n-mail-add.component';
import { NMailSearchFormComponent } from './n-mail/n-mail-search-form/n-mail-search-form.component';
import { NMailTableComponent } from './n-mail/n-mail-table/n-mail-table.component';

@NgModule({
  declarations: [
    NMailComponent,
    NMailAddComponent,
    NMailSearchFormComponent,
    NMailTableComponent,
  ],
  imports: [SharedModule, NormalSettingRoutingModule],
})
export class NormalSettingModule { }
