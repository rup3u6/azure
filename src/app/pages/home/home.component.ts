import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { TabulatorTableComponent } from 'src/app/shared/components/tabulator-table/tabulator-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('tabulatorTable')
  tabulatorTableComponent!: TabulatorTableComponent;

  @ViewChild('status') statusElRef!: ElementRef;
  @ViewChild('name') nameElRef!: ElementRef;
  arr: Array<any> = [];
  columnNames: {}[] = [
    { title: '主鍵', field: 'Location_Id', i18n: 'Location_Id' },
    { title: '公司別主鍵', field: 'Cfk_Company_Id', i18n: 'Cfk_Company_Id' },
    { title: '狀態', field: 'Location_State', i18n: 'Location_State' },
    { title: '區域名稱', field: 'Location_Name', i18n: 'Location_Name' },
    { title: '區域代號', field: 'Location_Code', i18n: 'Location_Code' },
    { title: '排序', field: 'Location_Sort', i18n: 'Location_Sort' },
    {
      title: '建立者ID',
      field: 'Location_CreateId',
      i18n: 'Location_CreateId',
    },
    {
      title: '建檔日期',
      field: 'Location_CreateDate',
      i18n: 'Location_CreateDate',
    },
    {
      title: '建立者IP',
      field: 'Location_CreateIp',
      i18n: 'Location_CreateIp',
    },
    { title: '異動者ID', field: 'Location_EditId', i18n: 'Location_EditId' },
    {
      title: '異動日期',
      field: 'Location_EditDate',
      i18n: 'Location_EditDate',
    },
    { title: '異動者IP', field: 'Location_EditIp', i18n: 'Location_EditIp' },
  ];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  async test() {
    const body = {
      location_State: !!this.statusElRef.nativeElement.value,
      location_Name: this.nameElRef.nativeElement.value,
    };
    let res: any = await lastValueFrom(
      this.http.post('/api/Base/WfLocation/Get', body)
    );
    this.tabulatorTableComponent.table.setData(res.data);
  }
}
