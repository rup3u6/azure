import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// emum
import { ListItem } from 'src/app/core/enum/list-item';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list_item.service';
import { UseInfoService } from 'src/app/core/services/authAPI/use-info.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'sys-use-info-add',
  templateUrl: './use-info-add.component.html',
  styleUrls: ['./use-info-add.component.scss']
})
export class UseInfoAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  roleNameList: any = [];

  isUseInfoFormGroup = false;
  useInfoFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public listItemService: ListItemService,
    public useInfoService: UseInfoService,
    private loadingService: LoadingService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getRoleName();

    this.useInfoFormGroup = this.formBuilder.group({
      info_Id: ['', [Validators.required]],
      info_Global: ['', [Validators.required]],
      info_Backend: ['', [Validators.required]],
    });
    if (this.data.mode === 'add') {
      this.setLanguageFormGroupInit();
    } else {
      this.useInfoFormGroup.controls?.['info_Global'].disable();
      this.useInfoFormGroup.patchValue({
        ...this.data.initData,
        info_Global: this.data.initData.info_Global === '1',
        info_Backend: this.data.initData.info_Backend === '1',
      });
    }
    this.isUseInfoFormGroup = true;
  }

  setLanguageFormGroupInit() {
    this.useInfoFormGroup.patchValue({
      info_Id: '',
      info_Global: false,
      info_Backend: false,
    });
  }

  async getRoleName() {
    this.loadingService.startLoading();

    try {
      const listItemRes = await firstValueFrom(this.listItemService.search([ListItem.顯示角色名稱]));

      if (listItemRes.status === '999') {
        let roleNameList = [];

        for (let i in listItemRes.data[0].dListItem) {
          roleNameList.push({
            key: i,
            value: listItemRes.data[0].dListItem[i],
          });
        }

        this.roleNameList = roleNameList;
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }

  async submit() {
    this.useInfoFormGroup.markAllAsTouched();

    if (this.useInfoFormGroup.invalid) { return }

    let body: any = {
      ...this.useInfoFormGroup.getRawValue(),
    };

    this.loadingService.startLoading();

    try {
      let res;

      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.useInfoService.add(body));
      } else {
        body.info_Id = this.data.initData.info_Id;
        body.info_Global = this.useInfoFormGroup.value.info_Global ? '1' : '0';
        body.info_Backend = this.useInfoFormGroup.value.info_Backend ? '1' : '0';
        res = await firstValueFrom(this.useInfoService.edit(body));
      }

      const { status } = res;

      if (status === '999') {
        let searchRes = await firstValueFrom(this.useInfoService.search());
        this.useInfoService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  get f() {
    return this.useInfoFormGroup.controls;
  }
}
