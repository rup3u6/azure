import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { LocationService } from 'src/app/core/services/baseAPI/location.service';
import { LoadingService } from 'src/app/core/services/loading.service';

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

  locationFormGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public locationService: LocationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.locationFormGroup = this.formBuilder.group({
      location_Name: [''],
      location_Code: [''],
      location_Sort: [''],
      location_State: [''],
    });
    if (this.data.mode === 'add') {
      this.setLocationFormGroupInit();
    } else {
      let location_State = this.data.initData.location_State ? '1' : '0';
      this.locationFormGroup.patchValue({
        ...this.data.initData,
        location_State,
      });
    }
  }
  setLocationFormGroupInit() {
    this.locationFormGroup.patchValue({
      location_Name: '',
      location_Code: '',
      location_State: '1',
    });
  }

  async submit() {
    let { location_State } = this.locationFormGroup.value;
    let body: any = {
      ...this.locationFormGroup.value,
      location_State: location_State === '1',
    };

    this.loadingService.startLoading();
    try {
      let res;
      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.locationService.add(body));
      } else {
        body.location_Id = this.data.initData.location_Id;
        res = await firstValueFrom(this.locationService.edit(body));
      }
      const { status } = res;
      if (status === '999') {
        let searchRes = await firstValueFrom(this.locationService.search());
        this.locationService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
