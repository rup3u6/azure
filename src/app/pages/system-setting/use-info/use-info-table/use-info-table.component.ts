import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Tabulator } from 'tabulator-tables';

// services
import { UseInfoService } from 'src/app/core/services/authAPI/use-info.service';

@Component({
  selector: 'div[sys-use-info-table]',
  templateUrl: './use-info-table.component.html',
  styleUrls: ['./use-info-table.component.scss']
})
export class UseInfoTableComponent {

  @Output() seach = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

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
      title: '工號',
      field: 'info_Jobnumber',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '姓名',
      field: 'info_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center', formatter: (cell: any) => {
        const rowData = cell.getData();

        let text = '';

        if (rowData.info_Name) { text = rowData.info_Name; }
        if (rowData.info_Ename) { text += '(' + rowData.info_Ename + ")"; }

        return text;
      },
    },
    {
      title: 'Site',
      field: 'info_Site',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '部門',
      field: 'info_Dept',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '秘書',
      field: 'info_Secretary',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const rowData = cell.getData();

        let text = '';

        if (rowData.info_Secretary) { text = rowData.info_Secretary; }

        if (rowData.secretary_Name) {
          if (text) { text += '-'; }

          text += rowData.secretary_Name;
        }

        if (rowData.secretary_EName) {
          if (text) { text += '/'; }

          text += rowData.secretary_EName;
        }

        return text;
      },
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

  constructor(
    private datePipe: DatePipe,
    public useInfoService: UseInfoService
  ) { }

  tableBuilded(table: Tabulator) {
    this.useInfoService.tableBuilded(table);
  }
}
