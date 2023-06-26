import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { DemoNgZorroAntdModule } from 'src/app/shared/module/ng-zorro-antd.module';

// pipe
import { DatePipe } from '@angular/common';

// ng-zorro
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

// component
import { TabulatorTableComponent } from './components/tabulator-table/tabulator-table.component';
import { DeleteConfirmComponent } from './components/dialog/delete-confirm/delete-confirm.component';
import { TabulatorTablePaginationComponent } from './components/tabulator-table-pagination/tabulator-table-pagination.component';
import { UseRoleAddPermissionComponent } from '../pages/system-setting/use-role/use-role-add-permission/use-role-add-permission.component';
import { TabulatorCtrlComponent } from './components/tabulator-ctrl/tabulator-ctrl.component';

// pipe
import { ErrorMessagePipe } from './pipes/error-message.pipe';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    TabulatorTableComponent,
    ErrorMessagePipe,
    DeleteConfirmComponent,
    TabulatorTablePaginationComponent,
    UseRoleAddPermissionComponent,
    TabulatorCtrlComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TabulatorTableComponent,
    ErrorMessagePipe,
    DeleteConfirmComponent,
    TabulatorTablePaginationComponent,
    DemoNgZorroAntdModule,
    UseRoleAddPermissionComponent,
    TabulatorCtrlComponent,
  ],
  providers: [
    DatePipe,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class SharedModule {
}
