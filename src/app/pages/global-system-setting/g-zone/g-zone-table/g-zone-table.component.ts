import {
  Component,
  EventEmitter,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { DatePipe } from '@angular/common';

// service
import { GZoneService } from 'src/app/core/services/baseAPI/g-zone.service';
import { TranslateService } from '@ngx-translate/core';

// components
import {
  TabulatorCtrlComponent,
  TabulatorCtrlType,
} from 'src/app/shared/components/tabulator-ctrl/tabulator-ctrl.component';

@Component({
  selector: 'div[g-zone-table]',
  templateUrl: './g-zone-table.component.html',
  styleUrls: ['./g-zone-table.component.scss'],
  entryComponents: [TabulatorCtrlComponent],
})
export class GZoneTableComponent {
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
      title: 'PAGES.ZONE_NAME', //  區域名稱
      field: 'zone_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.ZONE_STATE', //  狀態
      field: 'zone_State',
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
      title: 'PAGES.ZONE_SORT', //  排序
      field: 'zone_Sort',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.EDIT_DATE', //  異動日期
      field: 'zone_EditDate',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const timeStamp = cell.getValue();

        if (timeStamp) {
          const date = new Date(timeStamp * 1000);
          return this.datePipe.transform(date, 'yyyy/MM/dd');
        } else {
          return '';
        }
      },
    },
    {
      title: 'PAGES.EDIT_IP', //  異動IP
      field: 'zone_EditIp',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.EDIT_CODE', //  異動者
      field: 'zone_EditCode',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'PAGES.FUNCTION', //  功能
      vertAlign: 'middle',
      maxWidth: 80,
      minWidth: 80,
      headerSort: false,
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const rowData = cell.getData();

        const componentRef = this.viewContainerRef.createComponent(
          TabulatorCtrlComponent
        );
        const component = componentRef.instance as TabulatorCtrlComponent;

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
    public gZoneService: GZoneService,
    private translateService: TranslateService
  ) {}

  tableBuilded(table: Tabulator) {
    this.gZoneService.tableBuilded(table);
  }
}
