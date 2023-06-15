import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/responseStatus';
import { ListItem } from 'src/app/core/enum/list-item';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';
import { SecretaryService } from 'src/app/core/services/secretaryAPI/secretary.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: '[sys-secretary-search-form]',
  templateUrl: './secretary-search-form.component.html',
  styleUrls: ['./secretary-search-form.component.scss']
})
export class SecretarySearchFormComponent implements OnInit {

  siteList: any = [];
  locationList: any = [];

  isSearchFormGroup = false;
  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public listItemService: ListItemService,
    public secretaryService: SecretaryService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getSite();

    this.searchFormGroup = this.formBuilder.group({
      info_Jobnumber: [''],
      info_Name: [''],
      sec_Depts: [''],
      sec_Special: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.secretaryService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
    this.search();
    this.isSearchFormGroup = true;
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      info_Jobnumber: '',
      info_Name: '',
      sec_Depts: '',
      sec_Special: '',
    });
  }

  async getSite() {
    this.loadingService.startLoading();

    try {
      const listItemRes = await firstValueFrom(this.listItemService.search([ListItem.顯示Site,]));

      if (listItemRes.status === ResponseStatus.執行成功) {
        let siteList = [];
        for (let i in listItemRes.data[0].dListItem) {
          siteList.push({
            key: i,
            value: listItemRes.data[0].dListItem[i],
          });
        }

        this.siteList = siteList;
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }

  async getLocation() {
    this.loadingService.startLoading();

    try {
      const listItemRes = await firstValueFrom(this.listItemService.search(
        [ListItem.與Site關聯_顯示Location名稱], this.searchFormGroup.value.cfk_Site
      ));

      if (listItemRes.status === ResponseStatus.執行成功) {
        let locationList = [];
        for (let i in listItemRes.data[0].dListItem) {
          locationList.push({
            key: i,
            value: listItemRes.data[0].dListItem[i],
          });
        }

        this.locationList = locationList;
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }

  async search() {
    this.loadingService.startLoading();
    this.secretaryService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.secretaryService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.secretaryService.getTabulatorTable().clearData();
    this.secretaryService.getTabulatorTable().clearSort();
  }
}
