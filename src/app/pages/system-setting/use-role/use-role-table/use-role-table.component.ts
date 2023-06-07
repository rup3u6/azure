import { Component, EventEmitter, Output } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { DatePipe } from '@angular/common';

// service
import { UseRoleService } from 'src/app/core/services/baseAPI/use-role.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[sys-use-role-table]',
  templateUrl: './use-role-table.component.html',
  styleUrls: ['./use-role-table.component.scss']
})
export class UseRoleTableComponent {

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
      title: '角色名稱',
      field: 'role_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動者',
      field: 'role_EditCode',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動日期',
      field: 'role_EditDate',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const timeStamp = cell.getValue();

        const date = new Date(timeStamp * 1000);

        return this.datePipe.transform(date, "yyyy/MM/dd");
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
    public useRoleService: UseRoleService
  ) { }

  tableBuilded(table: Tabulator) {
    this.useRoleService.tableBuilded(table);
  }
}
