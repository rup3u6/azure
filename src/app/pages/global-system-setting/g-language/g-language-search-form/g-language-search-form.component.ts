import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// service
import { GLanguageService } from 'src/app/core/services/baseAPI/g-language.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[g-language-search-form]',
  templateUrl: './g-language-search-form.component.html',
  styleUrls: ['./g-language-search-form.component.scss']
})
export class GLanguageSearchFormComponent implements OnInit {

  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public gLanguageService: GLanguageService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      lang_Name: [''],
      lang_Code: [''],
      lang_State: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.gLanguageService.setSearchFormValue(value),
    });
    this.setSearchFormGroupInit();
  }

  setSearchFormGroupInit() {
    this.searchFormGroup.patchValue({
      lang_Name: '',
      lang_Code: '',
      lang_State: '2',
    });
  }

  async search() {
    this.loadingService.startLoading();
    this.gLanguageService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.gLanguageService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.gLanguageService.getTabulatorTable().clearData();
  }
}
