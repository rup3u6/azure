import { Component, EventEmitter, Output } from '@angular/core';
import { LocationService } from 'src/app/core/services/baseAPI/location.service';
import { Tabulator } from 'tabulator-tables';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'div[sys-location-table]',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss'],
})
export class LocationTableComponent {
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
      title: '區域名稱',
      field: 'location_Name',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '區域代號',
      field: 'location_Code',
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
    },
    {
      title: '排序',
      field: 'location_Sort',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動日期',
      field: 'location_EditDate',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
      formatter: (cell: any) => {
        const timeStamp = cell.getValue();

        const date = new Date(timeStamp * 1000);

        return this.datePipe.transform(date, "yyyy/MM/dd");
      },
    },
    {
      title: '異動IP',
      field: 'location_EditIp',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動者',
      field: 'location_EditCode',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
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
        let icon = document.createElement('span');
        icon.classList.add('material-icons');
        icon.innerText = 'edit';
        icon.addEventListener('click', (event) => {
          event.stopPropagation();
          this.edit.emit(rowData);
        });
        return icon;
      },
    },
  ];
  constructor(
    private datePipe: DatePipe,
    public locationService: LocationService
  ) { }

  tableBuilded(table: Tabulator) {
    this.locationService.tableBuilded(table);
  }
}
