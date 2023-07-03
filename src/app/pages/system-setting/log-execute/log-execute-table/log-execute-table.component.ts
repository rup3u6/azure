import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Tabulator } from 'tabulator-tables';

// services
import { LogExecuteService } from 'src/app/core/services/baseAPI/log-execute.service';

// components
import { TabulatorCellComponent, TabulatorCellType } from 'src/app/shared/components/tabulator-cell/tabulator-cell.component';

@Component({
  selector: 'div[sys-log-execute-table]',
  templateUrl: './log-execute-table.component.html',
  styleUrls: ['./log-execute-table.component.scss'],
  entryComponents: [TabulatorCellComponent]
})
export class LogExecuteTableComponent {

  @Output() detail = new EventEmitter<any>();

  _columnResized = new Subject<any>();

  columnNames: Array<any> = [
    {
      title: '修改項目',
      field: 'logExec_Module',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const rowData = cell.getData();

        let list = [];

        if (rowData.logExec_Module) { list.push(rowData.logExec_Module); }
        if (rowData.logExec_ChangeItem) { list.push(rowData.logExec_ChangeItem); }
        if (rowData.info_Ename) { list.push(rowData.info_Ename); }

        const componentRef = this.viewContainerRef.createComponent(TabulatorCellComponent);
        const component = (componentRef.instance as TabulatorCellComponent);

        component.type = TabulatorCellType.link;
        component.data = list;
        component.onClick = (event: any) => {
          event.stopPropagation();
          const rowData = cell.getData();
          this.detail.emit(rowData);
        };
        this._columnResized.subscribe(() => { component.onResize() });

        return component.html;
      },
    },
    {
      title: '操作類型',
      field: 'logExec_Action',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '操作者',
      field: 'info_Jobnumber',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const rowData = cell.getData();

        let list = [];

        if (rowData.info_Jobnumber) { list.push(rowData.info_Jobnumber); }
        if (rowData.info_Email) { list.push(rowData.info_Email); }
        if (rowData.info_Ename) { list.push(rowData.info_Ename); }

        const componentRef = this.viewContainerRef.createComponent(TabulatorCellComponent);
        const component = (componentRef.instance as TabulatorCellComponent);

        component.data = list;
        this._columnResized.subscribe(() => { component.onResize() });

        return component.html;
      },
    },
    {
      title: '操作者IP',
      field: 'logExec_CreateIp',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '操作日期',
      field: 'logExec_CreateDate',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const timeStamp = cell.getValue();

        if (timeStamp) {
          const date = new Date(timeStamp * 1000);
          return this.datePipe.transform(date, 'yyyy/MM/dd HH:mm:ss');
        } else {
          return '';
        }
      },
    },
  ];

  constructor(
    private datePipe: DatePipe,
    public logExecuteService: LogExecuteService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  tableBuilded(table: Tabulator) {
    this.logExecuteService.tableBuilded(table);
  }

  columnResized() {
    this._columnResized.next(null);
  }
}
