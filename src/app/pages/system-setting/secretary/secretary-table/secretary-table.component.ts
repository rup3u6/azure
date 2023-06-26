import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { DatePipe } from '@angular/common';

// service
import { SecretaryService } from 'src/app/core/services/secretaryAPI/secretary.service';

// components
import { TabulatorCtrlComponent, TabulatorCtrlType } from 'src/app/shared/components/tabulator-ctrl/tabulator-ctrl.component';

@Component({
  selector: 'div[sys-secretary-table]',
  templateUrl: './secretary-table.component.html',
  styleUrls: ['./secretary-table.component.scss'],
  entryComponents: [TabulatorCtrlComponent]
})
export class SecretaryTableComponent {

  @Output() add = new EventEmitter<any>();
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
      title: '秘書工號',
      field: 'info_Jobnumber',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '秘書名稱',
      field: 'info_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '負責部門',
      field: 'sec_Depts',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '特殊名單',
      field: 'sec_Special',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動者',
      field: 'sec_EditCode',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動日期',
      field: 'sec_EditDate',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const timeStamp = cell.getValue();

        const date = new Date(timeStamp * 1000);

        return this.datePipe.transform(date, "yyyy/MM/dd HH:mm:ss");
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

        const componentRef = this.viewContainerRef.createComponent(TabulatorCtrlComponent);
        const component = (componentRef.instance as TabulatorCtrlComponent);

        component.type = TabulatorCtrlType.edit;
        component.data = rowData;
        component.edit = (event: any) => {
          event.stopPropagation();
          this.edit.emit(rowData);
        };

        return component.html;
      },
    },
  ];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private datePipe: DatePipe,
    public secretaryService: SecretaryService
  ) { }

  tableBuilded(table: Tabulator) {
    this.secretaryService.tableBuilded(table);
  }
}
