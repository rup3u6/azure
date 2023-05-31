import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { CInModuleClassSearch } from 'src/app/core/models/baseAPI/module-class';
import { GModuleClassService } from 'src/app/core/services/baseAPI/g-module-class.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[g-module-class-search-form]',
  templateUrl: './g-module-class-search-form.component.html',
  styleUrls: ['./g-module-class-search-form.component.scss']
})
export class GModuleClassSearchFormComponent implements OnInit {

  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public gModuleClassService: GModuleClassService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      modClass_Name: [''],
      modClass_State: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.gModuleClassService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      modClass_Name: '',
      modClass_State: '2',
    });
  }

  async search() {
    this.loadingService.startLoading();
    this.gModuleClassService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.gModuleClassService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.gModuleClassService.getTabulatorTable().clearData();
  }
}
