import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { DatePipe } from '@angular/common';

// models
import * as allowlist from 'src/app/core/models/authAPI/allowlist';

// services
import { GAllowlistService } from 'src/app/core/services/baseAPI/g-allowlist.service';

// components
import { TabulatorCtrlComponent, TabulatorCtrlType } from 'src/app/shared/components/tabulator-ctrl/tabulator-ctrl.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'div[g-allowlist-table]',
  templateUrl: './g-allowlist-table.component.html',
  styleUrls: ['./g-allowlist-table.component.scss'],
  entryComponents: [TabulatorCtrlComponent]
})
export class GAllowlistTableComponent {

  @Output() add = new EventEmitter<any>();
  @Output() batchAdd = new EventEmitter<any>();
  @Output() batchDelect = new EventEmitter<any>();
  @Output() delete = new EventEmitter<allowlist.GetResponses>();

  columnNames: Array<any> = [
    {
      title: 'PAGES.ZONE_NAME',  //  區域名稱
      field: 'zone_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.INFO_STATE',  //  工號
      field: 'fk_Info_Jobnumber',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.INFO_NAME',  //  中文姓名
      field: 'info_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.INFO_ENAME',  //  英文姓名
      field: 'info_Ename',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.INFO_STATE',  //  帳號狀態
      field: 'info_State',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const rowData = cell.getValue();

        const div = document.createElement('div');

        if (rowData === '1') {
          div.innerText = this.translateService.instant("SELECT_OPTIONS.VALID");  //  有效
        } else {
          div.innerText = this.translateService.instant("SELECT_OPTIONS.INVALID");  //  無效
          div.classList.add('disabled-val');
        }

        return div;
      },
    },
    {
      title: 'PAGES.FUNCTION',  //  功能
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

        component.type = TabulatorCtrlType.delete;
        component.data = rowData;
        component.del = (event: any) => {
          event.stopPropagation();
          this.delete.emit(rowData);
        };

        return component.html;
      },
    },
  ];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private datePipe: DatePipe,
    public gAllowlistService: GAllowlistService,
    private translateService:TranslateService
  ) { }

  tableBuilded(table: Tabulator) {
    this.gAllowlistService.tableBuilded(table);
  }
}
