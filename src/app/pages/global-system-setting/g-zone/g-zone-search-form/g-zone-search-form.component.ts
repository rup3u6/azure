import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { CInZoneSearch } from 'src/app/core/models/baseAPI/zone';
import { GZoneService } from 'src/app/core/services/baseAPI/g-zone.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[g-zone-search-form]',
  templateUrl: './g-zone-search-form.component.html',
  styleUrls: ['./g-zone-search-form.component.scss']
})
export class GZoneSearchFormComponent implements OnInit {

  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public gZoneService: GZoneService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      zone_State: [''],
      zone_Name: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.gZoneService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      zone_State: '2',
      zone_Name: '',
    });
  }

  async search() {
    this.loadingService.startLoading();
    this.gZoneService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.gZoneService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.gZoneService.getTabulatorTable().clearData();
  }
}
