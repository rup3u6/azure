import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// service
import { UseRoleService } from 'src/app/core/services/authAPI/use-role.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[sys-use-role-search-form]',
  templateUrl: './use-role-search-form.component.html',
  styleUrls: ['./use-role-search-form.component.scss']
})
export class UseRoleSearchFormComponent implements OnInit {

  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public useRoleService: UseRoleService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      role_State: [''],
      role_Name: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.useRoleService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
    this.search();
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      role_State: '1',
      role_Name: '',
    });
  }

  async search() {
    this.loadingService.startLoading();
    this.useRoleService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.useRoleService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.useRoleService.getTabulatorTable().clearData();
    this.useRoleService.getTabulatorTable().clearSort();
  }
}
