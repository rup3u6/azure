import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Tabulator } from 'tabulator-tables';

// services
import { LogExecuteService } from 'src/app/core/services/baseAPI/log-execute.service';

@Component({
  selector: 'div[sys-log-execute-table]',
  templateUrl: './log-execute-table.component.html',
  styleUrls: ['./log-execute-table.component.scss']
})
export class LogExecuteTableComponent {

  @Output() detail = new EventEmitter<any>();

  columnNames: Array<any> = [
    {
      title: '修改項目',
      field: 'logExec_Module',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const rowData = cell.getData();
        let aTag = document.createElement('a');

        let text = '';

        if (rowData.logExec_Module) { text = rowData.logExec_Module; }
        if (rowData.logExec_ChangeItem) {
          if (text) { text += '/'; }

          text += rowData.logExec_ChangeItem;
        }

        aTag.innerText = text;

        aTag.addEventListener('click', (event) => {
          event.stopPropagation();
          const rowData = cell.getData();
          this.detail.emit(rowData);
        });

        return aTag;
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

        let text = '';

        if (rowData.info_Jobnumber) { text = rowData.info_Jobnumber; }

        if (rowData.info_Email) {
          if (text) { text += '/'; }

          text += rowData.info_Email;
        }

        if (rowData.info_Ename) {
          if (text) { text += '/'; }

          text += rowData.info_Ename;
        }

        return text;
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
