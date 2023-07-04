import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

// service
import { GAllowlistService } from 'src/app/core/services/baseAPI/g-allowlist.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';

@Component({
  selector: 'div[g-allowlist-search-form]',
  templateUrl: './g-allowlist-search-form.component.html',
  styleUrls: ['./g-allowlist-search-form.component.scss']
})
export class GAllowlistSearchFormComponent implements OnInit {

  isSearchFormGroup = false;
  searchFormGroup!: FormGroup;

  cfkZoneOption: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public gAllowlistService: GAllowlistService,
    private loadingService: LoadingService,
    public listItemService: ListItemService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.GetZoneName();

    this.searchFormGroup = this.formBuilder.group({
      zone_Id: [''],
      info_Jobnumber: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.gAllowlistService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
    this.search();
    this.isSearchFormGroup = true;
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      zone_Id: '0',
      info_Jobnumber: '',
    });
  }

  async GetZoneName() {
    this.cfkZoneOption = await this.listItemService.GetZoneName();
  }

  async search() {
    this.loadingService.startLoading();
    this.gAllowlistService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.gAllowlistService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.gAllowlistService.getTabulatorTable().clearData();
    this.gAllowlistService.getTabulatorTable().clearSort();
  }
}
