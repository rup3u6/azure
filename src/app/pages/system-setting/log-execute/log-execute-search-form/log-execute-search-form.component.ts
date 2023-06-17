import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

// service
import { ValidatorService } from 'src/app/core/services/validator.service';
import { LogExecuteService } from 'src/app/core/services/baseAPI/log-execute.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[sys-log-execute-search-form]',
  templateUrl: './log-execute-search-form.component.html',
  styleUrls: ['./log-execute-search-form.component.scss']
})
export class LogExecuteSearchFormComponent implements OnInit {

  startSearchDate!: Date | null;
  endSearchDate!: Date | null;

  searchFormGroup!: FormGroup;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    public validatorService: ValidatorService,
    public logExecuteService: LogExecuteService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      logExec_ChangeItem: [''],
      logExec_Action: [''],
      startSearchDate: [''],
      endSearchDate: [''],
      info_Jobnumber: [''],
      info_Name: [''],
      info_Ename: [''],
    });
    this.searchFormGroup.setValidators(this.validatorService.dateRangeValidator('startSearchDate', 'endSearchDate'));

    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.logExecuteService.setSearchFormValue(value),
    });

    this.setSearchFormGroupInit();
    this.search();
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      logExec_ChangeItem: '',
      logExec_Action: '',
      startSearchDate: null,
      endSearchDate: null,
      info_Jobnumber: '',
      info_Name: '',
      info_Ename: '',
    });

    this.startSearchDate = new Date();
    this.startSearchDateChange(this.startSearchDate);

    this.endSearchDate = new Date();
    this.endSearchDateChange(this.endSearchDate);
  }

  startSearchDateChange(result: Date): void {
    if (result) {
      const date = this.datePipe.transform(result, "yyyy/MM/dd 00:00:00");

      if (date) {
        this.searchFormGroup.patchValue({
          startSearchDate: Math.round(new Date(date).getTime() / 1000)
        });
      }
    } else {
      this.searchFormGroup.patchValue({
        startSearchDate: result,
      });
    }
  }

  endSearchDateChange(result: Date): void {
    if (result) {
      const date = this.datePipe.transform(result, "yyyy/MM/dd 23:59:59");

      if (date) {
        this.searchFormGroup.patchValue({
          endSearchDate: Math.round(new Date(date).getTime() / 1000),
        });
      }
    } else {
      this.searchFormGroup.patchValue({
        endSearchDate: result,
      });
    }
  }

  disabledDate(current: Date): boolean {
    return new Date().getTime() < current.getTime();
  }

  async search() {
    this.searchFormGroup.markAllAsTouched();

    if (this.searchFormGroup.invalid) { return }

    this.loadingService.startLoading();
    this.logExecuteService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res: any) => {
        this.logExecuteService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.logExecuteService.getTabulatorTable().clearData();
    this.logExecuteService.getTabulatorTable().clearSort();
  }

  get f() {
    return this.searchFormGroup.controls;
  }
}
