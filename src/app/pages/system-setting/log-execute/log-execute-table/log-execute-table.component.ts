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

  @Output() detail = new EventEmitter<any>();

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
      formatter: (cell: any) => {
        const rowData = cell.getData();
        let aTag = document.createElement('a');
        aTag.innerText = rowData.logExec_Module;
        aTag.addEventListener('click', (event) => {
          event.stopPropagation();
          const rowData = cell.getData();
          this.detail.emit(rowData);
        });
        return aTag;
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
