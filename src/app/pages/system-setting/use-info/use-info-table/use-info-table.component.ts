import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Tabulator } from 'tabulator-tables';

// services
import { UseInfoService } from 'src/app/core/services/authAPI/use-info.service';

// components
import { TabulatorCtrlComponent, TabulatorCtrlType } from 'src/app/shared/components/tabulator-ctrl/tabulator-ctrl.component';
import { TabulatorCellComponent } from 'src/app/shared/components/tabulator-cell/tabulator-cell.component';

@Component({
  selector: 'div[sys-use-info-table]',
  templateUrl: './use-info-table.component.html',
  styleUrls: ['./use-info-table.component.scss'],
  entryComponents: [TabulatorCtrlComponent, TabulatorCellComponent]
})
export class UseInfoTableComponent {

  @Output() seach = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  _columnResized = new Subject<any>();

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
      title: 'PAGES.INFO_JOBNUMBER',  //  工號
      field: 'info_Jobnumber',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.INFO_NAME_AND_ENAME',  //  姓名
      field: 'info_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center', formatter: (cell: any) => {
        const rowData = cell.getData();

        let text = '';

        if (rowData.info_Name) { text = rowData.info_Name; }
        if (rowData.info_Ename) { text += '(' + rowData.info_Ename + ")"; }

        return text;
      },
    },
    {
      title: 'PAGES.INFO_SITE',  //  Site
      field: 'info_Site',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.INFO_DEPT',  //  部門
      field: 'info_Dept',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.INFO_SECRETARY_AND_NAME',  //  秘書
      field: 'info_Secretary',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const rowData = cell.getData();

        let list = [];

        if (rowData.info_Secretary) { list.push(rowData.info_Secretary); }
        if (rowData.secretary_Name) { list.push(rowData.secretary_Name); }
        if (rowData.secretary_EName) { list.push(rowData.secretary_EName); }

        const componentRef = this.viewContainerRef.createComponent(TabulatorCellComponent);
        const component = (componentRef.instance as TabulatorCellComponent);

        component.data = list;
        this._columnResized.subscribe(() => { component.onResize() });

        return component.html;
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
    public useInfoService: UseInfoService
  ) { }

  tableBuilded(table: Tabulator) {
    this.useInfoService.tableBuilded(table);
  }

  columnResized() {
    this._columnResized.next(null);
  }
}
