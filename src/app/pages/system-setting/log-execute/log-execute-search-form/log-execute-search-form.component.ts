import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { LogExecuteService } from 'src/app/core/services/baseAPI/log-execute.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'div[sys-log-execute-search-form]',
  templateUrl: './log-execute-search-form.component.html',
  styleUrls: ['./log-execute-search-form.component.scss']
})
export class LogExecuteSearchFormComponent implements OnInit {

  startSearchDate!: Date;
  endSearchDate!: Date;

  searchFormGroup!: FormGroup;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
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
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.logExecuteService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
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
  }

  startSearchDateChange(result: Date): void {
    const date = this.datePipe.transform(result, "yyyy/MM/dd 00:00:00");

    if (date) {
      this.searchFormGroup.patchValue({
        startSearchDate: Math.round(new Date(date).getTime() / 1000)
      });
    }
  }

  endSearchDateChange(result: Date): void {
    const date = this.datePipe.transform(result, "yyyy/MM/dd 24:59:59");

    if (date) {
      this.searchFormGroup.patchValue({
        endSearchDate: Math.round(new Date(date).getTime() / 1000)
      });
    }
  }

  async search() {
    this.loadingService.startLoading();
    this.logExecuteService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.logExecuteService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.logExecuteService.getTabulatorTable().clearData();
  }
}
