import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { LanguageService } from 'src/app/core/services/baseAPI/language.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'g-language-add',
  templateUrl: './g-language-add.component.html',
  styleUrls: ['./g-language-add.component.scss']
})
export class GLanguageAddComponent {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  languageFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public languageService: LanguageService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.languageFormGroup = this.formBuilder.group({
      lang_Name: [''],
      lang_Code: [''],
      lang_State: [''],
    });
    if (this.data.mode === 'add') {
      this.setLanguageFormGroupInit();
    } else {
      this.languageFormGroup.patchValue({
        ...this.data.initData,
      });
    }
  }

  setLanguageFormGroupInit() {
    this.languageFormGroup.patchValue({
      lang_Name: '',
      lang_Code: '',
      lang_State: '1',
    });
  }

  async submit() {
    let body: any = {
      ...this.languageFormGroup.value,
    };

    this.loadingService.startLoading();

    try {
      let res;

      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.languageService.add(body));
      } else {
        res = await firstValueFrom(this.languageService.edit(body));
      }

      const { status } = res;

      if (status === '999') {
        let searchRes = await firstValueFrom(this.languageService.search());
        this.languageService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
