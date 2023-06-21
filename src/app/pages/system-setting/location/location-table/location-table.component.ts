import { Component, EventEmitter, Output } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { DatePipe } from '@angular/common';

// service
import { LocationService } from 'src/app/core/services/baseAPI/location.service';

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
        let text = '';

        if (rowData.info_Jobnumber) { text = rowData.info_Jobnumber; }

        if (rowData.location_EditCode) {
          if (text) { text += '/'; }

          text += rowData.location_EditCode;
        }

        if (rowData.info_Ename) {
          if (text) { text += '/'; }

          text += rowData.info_Ename;
        }

        return text;
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

        const date = new Date(timeStamp * 1000);

        return this.datePipe.transform(date, "yyyy/MM/dd HH:mm");
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
