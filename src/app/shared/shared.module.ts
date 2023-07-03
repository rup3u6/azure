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
import { DeleteConfirmComponent } from './components/dialog/delete-confirm/delete-confirm.component';
import { RepeatConfirmComponent } from './components/dialog/repeat-confirm/repeat-confirm.component';
import { TabulatorTablePaginationComponent } from './components/tabulator-table-pagination/tabulator-table-pagination.component';
import { TabulatorTableComponent } from './components/tabulator-table/tabulator-table.component';
import { TabulatorCtrlComponent } from './components/tabulator-ctrl/tabulator-ctrl.component';
import { TabulatorCellComponent } from './components/tabulator-cell/tabulator-cell.component';

// pipe
import { ErrorMessagePipe } from './pipes/error-message.pipe';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    ErrorMessagePipe,
    DeleteConfirmComponent,
    RepeatConfirmComponent,
    TabulatorTableComponent,
    TabulatorTablePaginationComponent,
    TabulatorCtrlComponent,
    TabulatorCellComponent,
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
    ErrorMessagePipe,
    DemoNgZorroAntdModule,
    DeleteConfirmComponent,
    RepeatConfirmComponent,
    TabulatorTableComponent,
    TabulatorTablePaginationComponent,
    TabulatorCtrlComponent,
    TabulatorCellComponent,
  ],
  providers: [
    DatePipe,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class SharedModule {
}
