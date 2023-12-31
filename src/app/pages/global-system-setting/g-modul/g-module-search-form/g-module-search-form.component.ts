import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// service
import { GModuleService } from 'src/app/core/services/authAPI/g-module.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[g-module-search-form]',
  templateUrl: './g-module-search-form.component.html',
  styleUrls: ['./g-module-search-form.component.scss']
})
export class GModuleSearchFormComponent implements OnInit {

  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public gModuleService: GModuleService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      modClass_Name: [''],
      mod_Name: [''],
      mod_State: ['']
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.gModuleService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
    this.search();
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      modClass_Name: '',
      mod_Name: '',
      mod_State: '1',
    });
  }

  async search() {
    this.loadingService.startLoading();
    this.gModuleService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.gModuleService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.gModuleService.getTabulatorTable().clearData();
    this.gModuleService.getTabulatorTable().clearSort();
  }
}
