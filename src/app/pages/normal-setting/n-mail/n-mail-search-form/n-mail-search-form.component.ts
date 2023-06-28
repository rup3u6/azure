import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

// service
import { NMailService } from 'src/app/core/services/authAPI/n-mail.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[n-mail-search-form]',
  templateUrl: './n-mail-search-form.component.html',
  styleUrls: ['./n-mail-search-form.component.scss']
})
export class NMailSearchFormComponent implements OnInit {

  searchFormGroup!: FormGroup;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    public nMailService: NMailService,
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
      next: (value) => this.nMailService.setSearchFormValue(value),
    });
    // this.setSearchFormGroupInit();
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
    // this.loadingService.startLoading();
    // this.nMailService
    //   .search()
    //   .pipe(
    //     finalize(() => {
    //       this.loadingService.stopLoading();
    //     })
    //   )
    //   .subscribe((res) => {
    //     this.nMailService.getTabulatorTable().setData(res.data);
    //   });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.nMailService.getTabulatorTable().clearData();
    this.nMailService.getTabulatorTable().clearSort();
  }
}
