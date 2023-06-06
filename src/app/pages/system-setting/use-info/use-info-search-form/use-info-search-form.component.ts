import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

// service
import { UseInfoService } from 'src/app/core/services/baseAPI/use-info.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[sys-use-info-search-form]',
  templateUrl: './use-info-search-form.component.html',
  styleUrls: ['./use-info-search-form.component.scss']
})
export class UseInfoSearchFormComponent implements OnInit {

  searchFormGroup!: FormGroup;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    public useInfoService: UseInfoService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      info_Jobnumber: [''],
      info_Name: [''],
      info_Ename: [''],
      info_Secretary: [''],
      secretary_Name: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.useInfoService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
    this.search();
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      info_Jobnumber: '',
      info_Name: '',
      info_Ename: '',
      info_Secretary: '',
      secretary_Name: '',
    });
  }

  async search() {
    this.loadingService.startLoading();
    this.useInfoService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.useInfoService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.useInfoService.getTabulatorTable().clearData();
    this.useInfoService.getTabulatorTable().clearSort();
  }
}
