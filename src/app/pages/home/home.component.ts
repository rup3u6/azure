import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TabulatorTableComponent } from 'src/app/shared/components/tabulator-table/tabulator-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('tabulatorTable')
  tabulatorTableComponent!: TabulatorTableComponent;

  arr: Array<any> = [];
  columnNames: {}[] = [
    { title: 'tabulator.WfLocation.Location_Id', field: 'Location_Id' },
    { title: 'tabulator.WfLocation.Cfk_Company_Id', field: 'Cfk_Company_Id' },
    { title: 'tabulator.WfLocation.Location_State', field: 'Location_State' },
    { title: 'tabulator.WfLocation.Location_Name', field: 'Location_Name' },
    { title: 'tabulator.WfLocation.Location_Code', field: 'Location_Code' },
    { title: 'tabulator.WfLocation.Location_Sort', field: 'Location_Sort' },
    {
      title: 'tabulator.WfLocation.Location_CreateId',
      field: 'Location_CreateId',
    },
    {
      title: 'tabulator.WfLocation.Location_CreateDate',
      field: 'Location_CreateDate',
    },
    {
      title: 'tabulator.WfLocation.Location_CreateIp',
      field: 'Location_CreateIp',
    },
    { title: 'tabulator.WfLocation.Location_EditId', field: 'Location_EditId' },
    {
      title: 'tabulator.WfLocation.Location_EditDate',
      field: 'Location_EditDate',
    },
    { title: 'tabulator.WfLocation.Location_EditIp', field: 'Location_EditIp' },
  ];
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {}
  async test() {
    this.loadingService.startLoading();
    const body = {
      location_State: true,
      location_Name: '',
    };
    try {
      let res: any = await lastValueFrom(
        this.http.post('/wis_api/Base/WfLocation/Get', body)
      );
      this.tabulatorTableComponent.table.setData(res.data);
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
