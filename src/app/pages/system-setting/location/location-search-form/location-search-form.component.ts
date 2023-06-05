import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// service
import { LocationService } from 'src/app/core/services/baseAPI/location.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[sys-location-search-form]',
  templateUrl: './location-search-form.component.html',
  styleUrls: ['./location-search-form.component.scss'],
})
export class LocationSearchFormComponent implements OnInit {

  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public locationService: LocationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      location_Name: [''],
      location_Code: [''],
      location_State: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.locationService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      location_Name: '',
      location_Code: '',
      location_State: '2',
    });
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
  }
}
