import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/responseStatus';

// service
import { GLanguageService } from 'src/app/core/services/baseAPI/g-language.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'g-language-add',
  templateUrl: './g-language-add.component.html',
  styleUrls: ['./g-language-add.component.scss']
})
export class GLanguageAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data = {
    mode: '',
    initData: {},
  };

  languageFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public gLanguageService: GLanguageService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.languageFormGroup = this.formBuilder.group({
      lang_Name: ['', [Validators.required]],
      lang_Code: ['', [Validators.required]],
      lang_State: ['', [Validators.required]],
      i18N_Front: ['', [Validators.required]],
      i18N_Back: ['', [Validators.required]],
    });
    this.languageFormGroup.controls?.['i18N_Front'].disable();
    this.languageFormGroup.controls?.['i18N_Back'].disable();
    if (this.data.mode === 'add') {
      this.setLanguageFormGroupInit();
    } else {
      this.languageFormGroup.patchValue({
        ...this.data.initData,
      });
      this.languageFormGroup.controls?.['lang_Code'].disable();
    }
  }

  setLanguageFormGroupInit() {
    this.languageFormGroup.patchValue({
      lang_Name: '',
      lang_Code: '',
      lang_State: '1',
      i18N_Front: '',
      i18N_Back: '',
    });
  }

  async submit() {
    this.languageFormGroup.markAllAsTouched();

    if (this.languageFormGroup.invalid) { return }

    let body: any = {
      ...this.languageFormGroup.getRawValue(),
      i18N_Front: this.languageFormGroup.getRawValue().lang_Code + '_f.json',
      i18N_Back: this.languageFormGroup.getRawValue().lang_Code + '_b.json',
    };

    this.loadingService.startLoading();

    try {
      let res;

      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.gLanguageService.add(body));
      } else {
        res = await firstValueFrom(this.gLanguageService.edit(body));
      }

      const { status } = res;

      if (status === ResponseStatus.執行成功) {
        let searchRes = await firstValueFrom(this.gLanguageService.search());
        this.gLanguageService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  get f() {
    return this.languageFormGroup.controls;
  }
}
