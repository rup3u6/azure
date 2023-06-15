import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// service
import { ValidatorService } from 'src/app/core/services/validator.service';
import { UseInfoService } from 'src/app/core/services/authAPI/use-info.service';
import { UseRoleService } from 'src/app/core/services/authAPI/use-role.service';
import { LoadingService } from 'src/app/core/services/loading.service';

// ng-zorro-antd
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'sys-use-role-add',
  templateUrl: './use-role-add.component.html',
  styleUrls: ['./use-role-add.component.scss'],
})
export class UseRoleAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  tab = 1;

  useInfoList: TransferItem[] = [];

  roleStartDate!: Date;
  roleEndDate!: Date;

  isUseRoleFormGroup = false;
  useRoleFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private validatorService: ValidatorService,
    private useInfoService: UseInfoService,
    public useRoleService: UseRoleService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getUseInfo();

    this.useRoleFormGroup = this.formBuilder.group({
      oCIn_UseRole_PageData: this.formBuilder.group({
        role_State: ['', [Validators.required]],
        role_Name: ['', [Validators.required]],
        role_StartDate: ['', [Validators.required]],
        role_EndDate: ['', [Validators.required]],
      }),
      lCIn_UseRoleMember_PageData: this.formBuilder.array([], [Validators.required, Validators.minLength(1)]),
      lCIn_UseRoleAuth_PageData: this.formBuilder.array([], [Validators.required, Validators.minLength(1)]),
    });
    this.useRoleFormGroup.setValidators(
      this.validatorService.dateRangeValidator(
        ['oCIn_UseRole_PageData', 'role_StartDate'],
        ['oCIn_UseRole_PageData', 'role_EndDate'],
      )
    );

    if (this.data.mode === 'add') {
      this.setLanguageFormGroupInit();
    } else {
      this.roleStartDate = new Date(this.datePipe.transform(this.data.initData.oCTab_UseRole.role_StartDate * 1000, 'yyyy/MM/dd 00:00:00') ?? '');
      this.roleEndDate = new Date(this.datePipe.transform(this.data.initData.oCTab_UseRole.role_EndDate * 1000, 'yyyy/MM/dd 23:59:59') ?? '');

      this.useRoleFormGroup.patchValue({
        oCIn_UseRole_PageData: this.data.initData.oCTab_UseRole,
      });

      await this.useRoleMemberChange();
    }

    this.isUseRoleFormGroup = true;
  }

  setLanguageFormGroupInit() {
    this.useRoleFormGroup.patchValue({
      oCIn_UseRole_PageData: {
        role_State: '1',
        role_Name: '',
        role_StartDate: '',
        role_EndDate: '',
      },
      lCIn_UseRoleMember_PageData: [],
      lCIn_UseRoleAuth_PageData: [],
    });
  }

  roleStartDateChange(result: Date): void {
    if (result) {
      const date = this.datePipe.transform(result, 'yyyy/MM/dd 00:00:00');

      if (date) {
        (<FormGroup>this.useRoleFormGroup.get('oCIn_UseRole_PageData')).patchValue({
          role_StartDate: Math.round(new Date(date).getTime() / 1000),
        });
      }
    } else {
      this.useRoleFormGroup.patchValue({
        role_StartDate: result,
      });
    }
  }

  roleEndDateChange(result: Date): void {
    if (result) {
      const date = this.datePipe.transform(result, 'yyyy/MM/dd 23:59:59');

      if (date) {
        (<FormGroup>this.useRoleFormGroup.get('oCIn_UseRole_PageData')).patchValue({
          role_EndDate: Math.round(new Date(date).getTime() / 1000),
        });
      }
    } else {
      this.useRoleFormGroup.patchValue({
        role_EndDate: result,
      });
    }
  }

  async getUseInfo() {
    const body = {
      info_Jobnumber: '',
      info_Name: '',
      info_Ename: '',
      info_Secretary: '',
      secretary_Name: '',
    };

    this.loadingService.startLoading();

    try {
      const useInfoRes = await firstValueFrom(this.useInfoService.search(body));

      if (useInfoRes.status === ResponseStatus.執行成功) {
        this.useInfoList = useInfoRes.data.map((item: any) => {
          //#region title
          let text = '';

          if (item.info_Jobnumber) { text = item.info_Jobnumber; }

          if (item.info_Name) {
            if (text) { text += '-'; }

            text += item.info_Name;
          }
          if (item.secretary_Name) {
            if (text) { text += '/'; }

            text += item.secretary_Name;
          }
          //#endregion

          //#region direction
          let isSelect = false;

          if (this.data.mode === 'edit') {
            isSelect = this.data.initData.lCTab_UseRoleMember
              .some((item2: any) => item.info_Id === item2.cfk_Info_Id);
          }
          //#endregion

          return {
            key: item.info_Id,
            title: text,
            direction: isSelect ? 'right' : 'left'
          };
        });
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }

  useRoleMemberChange(): void {
    const useInfoSelect = this.useInfoList
      .filter((item: any) => item.direction === 'right')
      .map((item: any) => {
        let obj;

        if (this.data.mode === 'add') {
          obj = { cfk_Info_Id: item.key };
        } else {
          obj = {
            cfk_Role_Id: this.data.initData.oCTab_UseRole.role_Id,
            cfk_Info_Id: item.key
          }
        }

        return this.formBuilder.group(obj);
      });

    this.useRoleFormGroup.setControl(
      'lCIn_UseRoleMember_PageData',
      this.formBuilder.array(useInfoSelect, [Validators.required, Validators.minLength(1)])
    );
  }

  async submit() {
    this.useRoleFormGroup.markAllAsTouched();

    if (this.useRoleFormGroup.invalid) {
      return;
    }

    this.loadingService.startLoading();

    try {
      let res;

      if (this.data.mode === 'add') {
        let body: any = {
          ...this.useRoleFormGroup.getRawValue(),
        };
        res = await firstValueFrom(this.useRoleService.add(body));
      } else {
        let body: any = {
          oCIn_UseRole_Update_PageData: this.useRoleFormGroup.getRawValue().oCIn_UseRole_PageData,
          lCIn_UseRoleMember_Update: this.useRoleFormGroup.getRawValue().lCIn_UseRoleMember_PageData,
          lCIn_UseRoleAuth_Update: this.useRoleFormGroup.getRawValue().lCIn_UseRoleAuth_PageData,
        };
        body.oCIn_UseRole_Update_PageData.role_Id = this.data.initData.oCTab_UseRole.role_Id;
        res = await firstValueFrom(this.useRoleService.edit(body));
      }

      const { status } = res;

      if (status === ResponseStatus.執行成功) {
        let searchRes = await firstValueFrom(this.useRoleService.search());
        this.useRoleService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  get f() {
    return this.useRoleFormGroup.controls;
  }
}
