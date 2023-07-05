import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { DatePipe } from '@angular/common';

// service
import { UseRoleService } from 'src/app/core/services/authAPI/use-role.service';
import { LoadingService } from 'src/app/core/services/loading.service';

// components
import { TabulatorCtrlComponent, TabulatorCtrlType } from 'src/app/shared/components/tabulator-ctrl/tabulator-ctrl.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'div[sys-use-role-table]',
  templateUrl: './use-role-table.component.html',
  styleUrls: ['./use-role-table.component.scss'],
  entryComponents: [TabulatorCtrlComponent]
})
export class UseRoleTableComponent {

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
      title: 'PAGES.ROLE_NAME',  //  角色名稱
      field: 'role_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.ROLE_STATE',  //  狀態
      field: 'role_State',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const lang_State =
          cell.getValue() === '1'
            ? 'SELECT_OPTIONS.ENABLE'
            : 'SELECT_OPTIONS.DISABLE';
        return this.translateService.instant(lang_State);
      },
    },
    {
      title: 'PAGES.EDIT_CODE',  //  異動者
      field: 'role_EditCode',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.EDIT_DATE',  //  異動日期
      field: 'role_EditDate',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const timeStamp = cell.getValue();

        if (timeStamp) {
          const date = new Date(timeStamp * 1000);
          return this.datePipe.transform(date, 'yyyy/MM/dd HH:mm');
        } else {
          return '';
        }
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
    public useRoleService: UseRoleService,
    private translateService: TranslateService
  ) { }

  tableBuilded(table: Tabulator) {
    this.useRoleService.tableBuilded(table);
  }
}
