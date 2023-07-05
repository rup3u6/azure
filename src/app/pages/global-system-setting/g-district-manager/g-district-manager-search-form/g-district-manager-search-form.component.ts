import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// service
import { GDistrictManagerService } from 'src/app/core/services/baseAPI/g-district-manager.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';

@Component({
  selector: 'div[g-district-manager-search-form]',
  templateUrl: './g-district-manager-search-form.component.html',
  styleUrls: ['./g-district-manager-search-form.component.scss']
})
export class GDistrictManagerSearchFormComponent implements OnInit {

  isSearchFormGroup = false;
  searchFormGroup!: FormGroup;

  zoneList: any[] = [];
  accountNameList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public gDistrictManagerService: GDistrictManagerService,
    private loadingService: LoadingService,
    public listItemService: ListItemService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getAccountName();

    this.searchFormGroup = this.formBuilder.group({
      fk_Zone_Id: [''],
      fk_Info_Id: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.gDistrictManagerService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
    this.search();
    this.isSearchFormGroup = true;
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      fk_Zone_Id: 0,
      fk_Info_Id: 0,
    });
  }

  async GetZoneName() {
    this.zoneList = await this.listItemService.GetZoneName();
  }

  async getAccountName() {
    this.accountNameList = await this.listItemService.getAccountName();
  }

  async search() {
    this.loadingService.startLoading();
    this.gDistrictManagerService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.gDistrictManagerService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.gDistrictManagerService.getTabulatorTable().clearData();
    this.gDistrictManagerService.getTabulatorTable().clearSort();
  }
}
