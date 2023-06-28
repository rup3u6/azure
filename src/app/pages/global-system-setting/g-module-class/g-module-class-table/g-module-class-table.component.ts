import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { DatePipe } from '@angular/common';

// service
import { GModuleClassService } from 'src/app/core/services/authAPI/g-module-class.service';

// components
import { TabulatorCtrlComponent, TabulatorCtrlType } from 'src/app/shared/components/tabulator-ctrl/tabulator-ctrl.component';

@Component({
  selector: 'div[g-module-class-table]',
  templateUrl: './g-module-class-table.component.html',
  styleUrls: ['./g-module-class-table.component.scss'],
  entryComponents: [TabulatorCtrlComponent]
})
export class GModuleClassTableComponent {

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
      title: '選單分類名稱',
      field: 'modClass_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '狀態',
      field: 'modClass_State',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        return cell.getValue() === '1' ? '啟用' : '停用';
      },
    },
    {
      title: '排序',
      field: 'modClass_Order',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動日期',
      field: 'modClass_EditDate',
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
      title: '異動者IP',
      field: 'modClass_CreateIp',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動者',
      field: 'modClass_EditCode',
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
    public gModuleClassService: GModuleClassService
  ) { }

  tableBuilded(table: Tabulator) {
    this.gModuleClassService.tableBuilded(table);
  }
}
