import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';
import { ListItem } from 'src/app/core/enum/list-item';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';
import { SecretaryService } from 'src/app/core/services/secretaryAPI/secretary.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: '[sys-secretary-search-form]',
  templateUrl: './secretary-search-form.component.html',
  styleUrls: ['./secretary-search-form.component.scss']
})
export class SecretarySearchFormComponent implements OnInit {

  isSearchFormGroup = false;
  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public listItemService: ListItemService,
    public secretaryService: SecretaryService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit(): Promise<void> {
    this.searchFormGroup = this.formBuilder.group({
      info_Jobnumber: [''],
      info_Name: [''],
      sec_Depts: [''],
      sec_Special: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.secretaryService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
    this.search();
    this.isSearchFormGroup = true;
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      info_Jobnumber: '',
      info_Name: '',
      sec_Depts: '',
      sec_Special: '',
    });
  }

  async search() {
    this.loadingService.startLoading();
    this.secretaryService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.secretaryService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.secretaryService.getTabulatorTable().clearData();
    this.secretaryService.getTabulatorTable().clearSort();
  }
}
