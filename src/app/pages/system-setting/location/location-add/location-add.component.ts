import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// models
import * as location from 'src/app/core/models/baseAPI/location';

// service
import { LocationService } from 'src/app/core/services/baseAPI/location.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';

@Component({
  selector: 'sys-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.scss'],
})
export class LocationAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  siteList: any = [];
  locationList: any = [];

  locationFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public locationService: LocationService,
    private loadingService: LoadingService,
    private listItemService: ListItemService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getSite();

    this.locationFormGroup = this.formBuilder.group({
      cfk_Site: ['', [Validators.required]],
      ck_Location_Code: ['', [Validators.required]],
      location_Name: ['', [Validators.required]],
      location_EnglishName: ['', [Validators.required]],
      location_Area: ['', [Validators.required]],
      location_Company: ['', [Validators.required]],
      location_State: ['', [Validators.required]],
    });
    if (this.data.mode === 'add') {
      this.setLocationFormGroupInit();
    } else {
      this.locationFormGroup.patchValue({
        ...this.data.initData,
      });
      this.locationFormGroup.controls?.['cfk_Site'].disable();
      this.locationFormGroup.controls?.['ck_Location_Code'].disable();
    }
  }

  setLocationFormGroupInit() {
    this.locationFormGroup.patchValue({
      cfk_Site: '',
      ck_Location_Code: '',
      location_Name: '',
      location_EnglishName: '',
      location_Area: '',
      location_Company: '',
      location_State: '1',
    });
  }

  async getSite() {
    this.siteList = await this.listItemService.getSite();
  }

  async getLocationCodeName() {
    this.locationList = await this.listItemService.getLocationCodeName(this.locationFormGroup.value.cfk_Site);
  }

  async submit() {
    this.locationFormGroup.markAllAsTouched();

    if (this.locationFormGroup.invalid) { return }

    let body: any = {
      ...this.locationFormGroup.getRawValue(),
    };

    this.loadingService.startLoading();

    try {
      let res;
      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.locationService.add(body));
      } else {
        body.cfk_Zone_Id = this.data.initData.cfk_Zone_Id;
        res = await firstValueFrom(this.locationService.edit(body));
      }
      const { status } = res;
      if (status === ResponseStatus.執行成功) {
        // let searchRes = await firstValueFrom(this.locationService.search());
        // this.locationService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  get f() {
    return this.locationFormGroup.controls;
  }
}
