import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { CInLanguageSearch } from 'src/app/core/models/baseAPI/language';
import { LanguageService } from 'src/app/core/services/baseAPI/language.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[g-language-search-form]',
  templateUrl: './g-language-search-form.component.html',
  styleUrls: ['./g-language-search-form.component.scss']
})
export class GLanguageSearchFormComponent {

  searchFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public languageService: LanguageService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      lang_Name: [''],
      lang_Code: [''],
      lang_State: [''],
    });
    this.searchFormGroup.valueChanges.subscribe({
      next: (value) => this.languageService.setSearchFormValue(value),
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
    this.languageService
      .search()
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        this.languageService.getTabulatorTable().setData(res.data);
      });
  }

  clear() {
    this.setSearchFormGroupInit();
    this.languageService.getTabulatorTable().clearData();
  }
}
