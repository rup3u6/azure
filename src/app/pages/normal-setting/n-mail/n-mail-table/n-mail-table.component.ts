import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { DatePipe } from '@angular/common';

// services
import { NMailService } from 'src/app/core/services/authAPI/n-mail.service';

// components
import { TabulatorCtrlComponent, TabulatorCtrlType } from 'src/app/shared/components/tabulator-ctrl/tabulator-ctrl.component';

@Component({
  selector: 'div[n-mail-table]',
  templateUrl: './n-mail-table.component.html',
  styleUrls: ['./n-mail-table.component.scss'],
  entryComponents: [TabulatorCtrlComponent]
})
export class NMailTableComponent {

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
      title: '規則名稱',
      field: '',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '事件',
      field: '',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '收件人',
      field: '',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '主旨',
      field: '',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '狀態',
      field: '',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        return cell.getValue() === '1' ? '啟用' : '停用';
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
    public nMailService: NMailService
  ) { }

  tableBuilded(table: Tabulator) {
    this.nMailService.tableBuilded(table);
  }
}
