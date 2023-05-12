import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    { title: '主鍵', field: 'Location_Id' },
    { title: '公司別主鍵', field: 'Cfk_Company_Id', editor: 'input' },
    { title: '狀態', field: 'Location_State' },
    { title: '區域名稱', field: 'Location_Name' },
    { title: '區域代號', field: 'Location_Code' },
    { title: '排序', field: 'Location_Sort' },
    { title: '建立者ID', field: 'Location_CreateId' },
    { title: '建檔日期', field: 'Location_CreateDate' },
    { title: '建立者IP', field: 'Location_CreateIp' },
    { title: '異動者ID', field: 'Location_EditId' },
    { title: '異動日期', field: 'Location_EditDate' },
    { title: '異動者IP', field: 'Location_EditIp' },
  ];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  async test() {
    const body = {
      location_State: this.statusElRef.nativeElement.value ? true : false,
      location_Name: this.nameElRef.nativeElement.value,
    };
    let res: any = await lastValueFrom(
      this.http.post('/api/Base/WfLocation/Get', body)
    );
    this.tabulatorTableComponent.table.setData(res.data);
  }
}
