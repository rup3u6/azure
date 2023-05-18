import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { CInCompanySearch } from 'src/app/core/models/baseAPI/company';
import { CompanyService } from 'src/app/core/services/baseAPI/company.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TabulatorTableComponent } from 'src/app/shared/components/tabulator-table/tabulator-table.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  @ViewChild('tabulatorTable')
  tabulatorTableComponent!: TabulatorTableComponent;

  companyFormGroup!: FormGroup;
  columnNames: Array<any> = [
    {
      formatter: 'rowSelection',
      titleFormatter: 'rowSelection',
      headerSort: false,
      maxWidth: 30,
      minWidth: 30,
      // cellClick: function (
      //   e: any,
      //   cell: {
      //     getRow: () => {
      //       (): any;
      //       new (): any;
      //       toggleSelect: { (): void; new (): any };
      //     };
      //   }
      // ) {
      //   cell.getRow().toggleSelect();
      // },
      vertAlign: 'middle',
      headerHozAlign: 'center',
    },
    {
      title: '公司名稱',
      field: 'company_Name',
      // formatter: function (
      //   cell: { getValue: () => string },
      //   formatterParams: any,
      //   onRendered: any
      // ) {
      //   return "<a href='#'>" + cell.getValue() + '</a>';
      // },
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '公司代號',
      field: 'company_Code',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動者',
      field: 'company_EditId',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '異動日期',
      field: 'company_EditDate',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
    {
      title: '功能',
      field: '功能',
      vertAlign: 'middle',
      maxWidth: 80,
      minWidth: 80,
      headerSort: false,
      hozAlign: 'center',
      headerHozAlign: 'center',
    },
  ];
  popupAddVis: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.companyFormGroup = this.formBuilder.group({
      company_Name: [''],
      company_State: [null],
    });
  }

  search() {
    let { company_State } = this.companyFormGroup.value;
    let body: CInCompanySearch = {
      ...this.companyFormGroup.value,
      company_State: JSON.parse(company_State),
    };

    this.loadingService.startLoading();
    this.companyService
      .search(body)
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.tabulatorTableComponent.table.setData(res.data);
      });
  }
}
