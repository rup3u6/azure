import { Component, EventEmitter, Output } from '@angular/core';
import { LanguageService } from 'src/app/core/services/baseAPI/language.service';
import { Tabulator } from 'tabulator-tables';

@Component({
  selector: 'div[g-language-table]',
  templateUrl: './g-language-table.component.html',
  styleUrls: ['./g-language-table.component.scss']
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
      title: '語系名稱',
      field: 'lang_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '語系代號',
      field: 'lang_Code',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '狀態',
      field: 'lang_State',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        return cell.getValue() === '1' ? '啟用' : '停用';
      },
    },
    {
      title: '異動日期',
      field: 'lang_EditDate',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const timeStamp = cell.getValue();
        return new Date(timeStamp * 1000).toLocaleDateString();
      },
    },
    {
      title: '異動IP',
      field: 'lang_EditIp',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動者',
      field: 'lang_EditId',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '功能',
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

  constructor(public languageService: LanguageService) {}

  tableBuilded(table: Tabulator) {
    this.languageService.tableBuilded(table);
  }
}
