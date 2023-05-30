import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { LogExecuteService } from 'src/app/core/services/baseAPI/log-execute.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[sys-log-execute-search-form]',
  templateUrl: './log-execute-search-form.component.html',
  styleUrls: ['./log-execute-search-form.component.scss']
})
export class LogExecuteSearchFormComponent implements OnInit {

  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public logExecuteService: LogExecuteService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      logExec_ChangeItem: [''],
      logExec_CreateCode: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.logExecuteService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      logExec_ChangeItem: '',
      logExec_CreateCode: '',
    });
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
