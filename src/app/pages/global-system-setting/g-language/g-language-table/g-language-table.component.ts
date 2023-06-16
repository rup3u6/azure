import { Component, EventEmitter, Output } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { DatePipe } from '@angular/common';

// service
import { GLanguageService } from 'src/app/core/services/baseAPI/g-language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'div[g-language-table]',
  templateUrl: './g-language-table.component.html',
  styleUrls: ['./g-language-table.component.scss'],
})
export class GLanguageTableComponent {
  @Output() add = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() deactivate = new EventEmitter<any>();

  columnNames: Array<any> = [
    {
      formatter: 'rowSelection',
      titleFormatter: 'rowSelection',
      headerSort: false,
      maxWidth: 30,
      minWidth: 30,
      vertAlign: 'middle',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.LANG_NAME', //  語系名稱,
      field: 'lang_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.LANG_CODE', //  語系代號
      field: 'lang_Code',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.I18N_FRONT', //  前台I18N檔名
      field: 'i18N_Front',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.I18N_BACK', //  後台I18N檔名
      field: 'i18N_Back',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.LANG_STATE', //  狀態
      field: 'lang_State',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const lang_State =
          cell.getValue() === '1'
            ? 'SELECT_OPTIONS.ENABLE'
            : 'SELECT_OPTIONS.DISABLE';
        return this.translateService.instant(lang_State);
      },
    },
    {
      title: 'PAGES.EDIT_DATE', //  異動日期
      field: 'lang_EditDate',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const timeStamp = cell.getValue();

        const date = new Date(timeStamp * 1000);

        return this.datePipe.transform(date, 'yyyy/MM/dd');
      },
    },
    {
      title: 'PAGES.EDIT_IP', //  異動IP
      field: 'lang_EditIp',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.EDIT_CODE', //  異動者
      field: 'lang_EditCode',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.FUNCTION', //  功能
      vertAlign: 'middle',
      maxWidth: 80,
      minWidth: 80,
      headerSort: false,
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const rowData = cell.getData();
        let icon = document.createElement('span');
        icon.classList.add('material-icons');
        icon.innerText = 'edit';
        icon.addEventListener('click', (event) => {
          event.stopPropagation();
          this.edit.emit(rowData);
        });
        return icon;
      },
    },
  ];

  constructor(
    private datePipe: DatePipe,
    private translateService: TranslateService,
    public gLanguageService: GLanguageService
  ) {}

  tableBuilded(table: Tabulator) {
    this.gLanguageService.tableBuilded(table);
  }
}
