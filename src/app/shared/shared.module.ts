import { NgModule } from '@angular/core';
import { TabulatorTableComponent } from './components/tabulator-table/tabulator-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ErrorMessagePipe } from './pipes/error-message.pipe';

@NgModule({
  declarations: [TabulatorTableComponent, ErrorMessagePipe],
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
  ],
})
export class SharedModule {
}
