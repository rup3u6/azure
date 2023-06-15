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

  constructor(
    private formBuilder: FormBuilder,
    public listItemService: ListItemService,
    public secretaryService: SecretaryService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getSite();

    this.secretaryFormGroup = this.formBuilder.group({
      pfk_Info_Id: ['', Validators.required],
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
    }
    this.isSecretaryFormGroup = true;
  }

  setSecretaryFormGroupInit() {
    this.secretaryFormGroup.patchValue({
      pfk_Info_Id: '',
      info_Site: '',
      sec_Depts: '',
      sec_Special: '',
    });
  }

  pfkInfoIdChange(e: any) {
    const useInfolist = this.useInfolist.find(item => item.key === this.secretaryFormGroup.value.pfk_Info_Id).value;

    this.secretaryFormGroup.patchValue({
      info_Site: useInfolist.split('/')[3],
    });
  }

  async getSite() {
    this.loadingService.startLoading();

    try {
      const listItemRes = await firstValueFrom(this.listItemService.search([ListItem.顯示工號_中名_英名_Site]));

      if (listItemRes.status === ResponseStatus.執行成功) {
        let siteList = [];
        for (let i in listItemRes.data[0].dListItem) {
          siteList.push({
            key: i,
            value: listItemRes.data[0].dListItem[i],
          });
        }

        this.useInfolist = siteList;
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }

  async submit() {
    this.secretaryFormGroup.markAllAsTouched();

    if (this.secretaryFormGroup.invalid) { return }

    let body: any = {
      ...this.secretaryFormGroup.value,
    };

    this.loadingService.startLoading();

    try {
      let res;
      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.secretaryService.add(body));
      } else {
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
