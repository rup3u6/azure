import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Tabulator } from 'tabulator-tables';

// service
import { LocationService } from 'src/app/core/services/baseAPI/location.service';

// components
import { TabulatorCtrlComponent, TabulatorCtrlType } from 'src/app/shared/components/tabulator-ctrl/tabulator-ctrl.component';
import { TabulatorCellComponent } from 'src/app/shared/components/tabulator-cell/tabulator-cell.component';

@Component({
  selector: 'div[sys-location-table]',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss'],
  entryComponents: [TabulatorCtrlComponent, TabulatorCellComponent]
})
export class LocationTableComponent {

  @Output() add = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() deactivate = new EventEmitter<any>();

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
      title: 'Site',
      field: 'cfk_Site',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'Location',
      field: 'ck_Location_Code',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'Local name',
      field: 'location_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'English Name',
      field: 'location_EnglishName',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '分區',
      field: 'location_Area',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: 'Company',
      field: 'location_Company',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '狀態',
      field: 'location_State',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        return cell.getValue() === '1' ? '啟用' : '停用';
      },
    },
    {
      title: '異動者',
      field: 'location_Sort',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const rowData = cell.getData();

        let list = [];

        if (rowData.info_Jobnumber) { list.push(rowData.info_Jobnumber); }
        if (rowData.location_EditCode) { list.push(rowData.location_EditCode); }
        if (rowData.info_Ename) { list.push(rowData.info_Ename); }

        const componentRef = this.viewContainerRef.createComponent(TabulatorCellComponent);
        const component = (componentRef.instance as TabulatorCellComponent);

        component.data = list;
        this._columnResized.subscribe(() => { component.onResize() });

        return component.html;
      },
    },
    {
      title: '異動時間',
      field: 'location_EditDate',
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
    private datePipe: DatePipe,
    public locationService: LocationService
  ) { }

  tableBuilded(table: Tabulator) {
    this.locationService.tableBuilded(table);
  }

  columnResized() {
    this._columnResized.next(null);
  }
}
