import { NgModule } from '@angular/core';
import { TabulatorTableComponent } from './components/tabulator-table/tabulator-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ErrorMessagePipe } from './pipes/error-message.pipe';
import { DeleteConfirmComponent } from './components/dialog/delete-confirm/delete-confirm.component';
import { TabulatorTablePaginationComponent } from './components/tabulator-table-pagination/tabulator-table-pagination.component';

@NgModule({
  declarations: [TabulatorTableComponent, ErrorMessagePipe, DeleteConfirmComponent, TabulatorTablePaginationComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
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
    TabulatorTablePaginationComponent
  ],
})
export class SharedModule {
}
