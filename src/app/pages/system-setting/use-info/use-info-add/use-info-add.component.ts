import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/responseStatus';
import { ListItem } from 'src/app/core/enum/list-item';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';
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

  roleList: any = [];

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
      info_Global: [''],
      info_Backend: [''],
      lCIn_UseInfo_RoleData: this.formBuilder.array([], [Validators.required, Validators.minLength(1)]),
    });
    if (this.data.mode === 'add') {
      this.setLanguageFormGroupInit();
    } else {
      this.useInfoFormGroup.patchValue({
        ...this.data.initData,
        info_Global: this.data.initData.info_Global === '1',
        info_Backend: this.data.initData.info_Backend === '1',
      });

      this.useInfoFormGroup.controls?.['info_Global'].disable();
      this.useInfoFormGroup.controls?.['info_Backend'].disable();

      this.data.initData.lCOut_UseRole_PageData.forEach((item: any) => {
        this.roleList.find((item2: any) => item.role_Id === item2.key).checked = true;
      });

      this.roleChange();
    }
    this.isUseInfoFormGroup = true;
  }

  setLanguageFormGroupInit() {
    this.useInfoFormGroup.patchValue({
      info_Global: '0',
      info_Backend: '0',
    });
  }

  async getRoleName() {
    this.loadingService.startLoading();

    try {
      const listItemRes = await firstValueFrom(this.listItemService.search([ListItem.顯示角色名稱]));

      if (listItemRes.status === ResponseStatus.執行成功) {
        let roleList = [];

        for (let i in listItemRes.data[0].dListItem) {
          roleList.push({
            key: i,
            value: listItemRes.data[0].dListItem[i],
          });
        }

        this.roleList = roleList;
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }

  roleChange() {
    const roleSelect = this.roleList
      .filter((item: any) => item.checked)
      .map((item: any) => {
        return this.formBuilder.group({
          cfk_Role_Id: item.key
        });
      });

    this.useInfoFormGroup.setControl(
      'lCIn_UseInfo_RoleData',
      this.formBuilder.array(roleSelect, [Validators.required, Validators.minLength(1)])
    )
  }

  async submit() {
    this.useInfoFormGroup.markAllAsTouched();

    if (this.useInfoFormGroup.invalid) { return }

    let body: any = {
      info_Name: this.data.initData.info_Name,
      info_Global: this.useInfoFormGroup.getRawValue().info_Global ? '1' : '0',
      info_Backend: this.useInfoFormGroup.getRawValue().info_Backend ? '1' : '0',
      lCIn_UseInfo_RoleData: this.useInfoFormGroup.getRawValue().lCIn_UseInfo_RoleData,
    };

    this.loadingService.startLoading();

    try {
      let res;

      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.useInfoService.add(body));
      } else {
        body.cfk_Info_Id = this.data.initData.info_Id;
        res = await firstValueFrom(this.useInfoService.edit(body));
      }

      const { status } = res;

      if (status === ResponseStatus.執行成功) {
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
