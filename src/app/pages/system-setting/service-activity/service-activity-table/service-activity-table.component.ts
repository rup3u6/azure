import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { Tabulator } from 'tabulator-tables';

// models
import * as allowlist from 'src/app/core/models/authAPI/allowlist';

// services
import { ServiceActivityService } from 'src/app/core/services/activityAPI/service-activity.service';

// components
import { TabulatorCtrlComponent, TabulatorCtrlType } from 'src/app/shared/components/tabulator-ctrl/tabulator-ctrl.component';
import { TabulatorCellComponent, TabulatorCellType } from 'src/app/shared/components/tabulator-cell/tabulator-cell.component';

@Component({
  selector: 'div[sys-service-activity-table]',
  templateUrl: './service-activity-table.component.html',
  styleUrls: ['./service-activity-table.component.scss'],
  entryComponents: [TabulatorCtrlComponent, TabulatorCellComponent]
})
export class ServiceActivityTableComponent {

  @Output() add = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  columnNames: Array<any> = [
    {
      title: '類別',
      field: 'srvAct_Type',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        return cell.getValue() === '1' ? '醫師' : '按摩師';
      },
    },
    {
      title: '名稱',
      field: 'srvAct_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '狀態',
      field: 'srvAct_State',
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
    public serviceActivityService: ServiceActivityService
  ) { }

  tableBuilded(table: Tabulator) {
    this.serviceActivityService.tableBuilded(table);
  }
}
