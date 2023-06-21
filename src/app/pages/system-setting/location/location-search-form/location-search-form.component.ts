import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';
import { ListItem } from 'src/app/core/enum/list-item';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';
import { LocationService } from 'src/app/core/services/baseAPI/location.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[sys-location-search-form]',
  templateUrl: './location-search-form.component.html',
  styleUrls: ['./location-search-form.component.scss'],
})
export class LocationSearchFormComponent implements OnInit {

  siteList: any = [];
  locationList: any = [];

  isSearchFormGroup = false;
  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public listItemService: ListItemService,
    public locationService: LocationService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getSite();

    this.searchFormGroup = this.formBuilder.group({
      ck_Location_Code: [''],
      cfk_Site: [''],
      location_State: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.locationService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
    this.search();
    this.isSearchFormGroup = true;
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      ck_Location_Code: '',
      cfk_Site: '',
      location_State: '1',
    });
  }

  async getSite() {
    this.siteList = await this.listItemService.getSite();
  }

  async getLocation() {
    this.locationList = await this.listItemService.getLocation(this.searchFormGroup.value.cfk_Site);
  }

  async search() {
    this.loadingService.startLoading();
    this.locationService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.locationService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.locationService.getTabulatorTable().clearData();
    this.locationService.getTabulatorTable().clearSort();
  }
}
