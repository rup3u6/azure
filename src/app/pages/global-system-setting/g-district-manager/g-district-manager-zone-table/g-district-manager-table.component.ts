import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { Tabulator } from 'tabulator-tables';

// models
import * as allowlist from 'src/app/core/models/authAPI/allowlist';

// services
import { GDistrictManagerService } from 'src/app/core/services/baseAPI/g-district-manager.service';

// components
import { TabulatorCtrlComponent, TabulatorCtrlType } from 'src/app/shared/components/tabulator-ctrl/tabulator-ctrl.component';
import { TabulatorCellComponent, TabulatorCellType } from 'src/app/shared/components/tabulator-cell/tabulator-cell.component';

@Component({
  selector: 'div[g-district-manager-table]',
  templateUrl: './g-district-manager-table.component.html',
  styleUrls: ['./g-district-manager-table.component.scss'],
  entryComponents: [TabulatorCtrlComponent, TabulatorCellComponent]
})
export class GDistrictManagerTableComponent {

  @Output() add = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() del = new EventEmitter<allowlist.GetResponses>();

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
      title: '區域名稱',
      field: 'zone_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '工號/姓名',
      field: 'info_Jobnumber',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const rowData = cell.getData();

        let list = [];

        if (rowData.info_Jobnumber) { list.push(rowData.info_Jobnumber); }
        if (rowData.info_Name) { list.push(rowData.info_Name); }

        const componentRef = this.viewContainerRef.createComponent(TabulatorCellComponent);
        const component = (componentRef.instance as TabulatorCellComponent);

        component.data = list;

        return component.html;
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
    public gDistrictManagerService: GDistrictManagerService
  ) { }

  tableBuilded(table: Tabulator) {
    this.gDistrictManagerService.tableBuilded(table);
  }
}
