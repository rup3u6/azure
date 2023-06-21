import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';
import { ListItem } from 'src/app/core/enum/list-item';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';
import { SecretaryService } from 'src/app/core/services/secretaryAPI/secretary.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'sys-secretary-add',
  templateUrl: './secretary-add.component.html',
  styleUrls: ['./secretary-add.component.scss']
})
export class SecretaryAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  useInfolist: any[] = [];

  isSecretaryFormGroup = false;
  secretaryFormGroup!: FormGroup;

  secretaryName = '';

  constructor(
    private formBuilder: FormBuilder,
    public listItemService: ListItemService,
    public secretaryService: SecretaryService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getSite();
    this.secretaryFormGroup = this.formBuilder.group({
      fk_Info_Id: ['', Validators.required],
      info_Site: ['', Validators.required],
      sec_Depts: ['', Validators.required],
      sec_Special: ['', Validators.required],
    });
    this.secretaryFormGroup.controls?.['info_Site'].disable();
    if (this.data.mode === 'add') {
      this.setSecretaryFormGroupInit();
    } else {
      this.secretaryFormGroup.patchValue({
        ...this.data.initData,
      });
      this.fkInfoIdChange();
    }
    this.isSecretaryFormGroup = true;
  }

  setSecretaryFormGroupInit() {
    this.secretaryFormGroup.patchValue({
      fk_Info_Id: '',
      info_Site: '',
      sec_Depts: '',
      sec_Special: '',
    });
  }

  fkInfoIdChange() {
    const useInfolist = this.useInfolist.find(item => item.key === this.secretaryFormGroup.value.fk_Info_Id).value;

    this.secretaryName = useInfolist;
    this.secretaryFormGroup.patchValue({
      info_Site: useInfolist.split('/')[3]
    });
  }

  async getSite() {
    this.useInfolist = await this.listItemService.getSecretaryName();
  }

  async submit() {
    this.secretaryFormGroup.markAllAsTouched();

    if (this.secretaryFormGroup.invalid) { return }

    let body: any = {
      ...this.secretaryFormGroup.getRawValue(),
      secretary_Name: this.secretaryName,
    };

    this.loadingService.startLoading();

    try {
      let res;
      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.secretaryService.add(body));
      } else {
        body.pk_Secretary = this.data.initData.pk_Secretary;
        res = await firstValueFrom(this.secretaryService.edit(body));
      }
      const { status } = res;
      if (status === ResponseStatus.執行成功) {
        let searchRes = await firstValueFrom(this.secretaryService.search());
        this.secretaryService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  get f() {
    return this.secretaryFormGroup.controls;
  }
}
