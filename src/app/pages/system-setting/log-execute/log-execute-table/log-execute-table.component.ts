import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { LogExecuteService } from 'src/app/core/services/baseAPI/log-execute.service';
import { Tabulator } from 'tabulator-tables';

@Component({
  selector: 'div[sys-log-execute-table]',
  templateUrl: './log-execute-table.component.html',
  styleUrls: ['./log-execute-table.component.scss']
})
export class LogExecuteTableComponent {

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
      title: '操作類型',
      field: 'logExec_Module',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      cellClick: (e: any, cell: any) => {
        e.preventDefault();
        e.stopPropagation();

        const rowData = cell.getData();
        this.edit.emit(rowData);
      },
    },
    {
      title: '操作者',
      field: 'logExec_CreateCode',
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

        const date = new Date(timeStamp * 1000);

        return this.datePipe.transform(date, "yyyy/MM/dd HH:mm:ss");
      },
    },
  ];

  constructor(
    private datePipe: DatePipe,
    public logExecuteService: LogExecuteService
  ) { }

  tableBuilded(table: Tabulator) {
    this.logExecuteService.tableBuilded(table);
  }
}
