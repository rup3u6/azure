import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';
import { NMailService } from 'src/app/core/services/authAPI/n-mail.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'n-mail-add',
  templateUrl: './n-mail-add.component.html',
  styleUrls: ['./n-mail-add.component.scss']
})
export class NMailAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  roleList: any = [];

  isMailFormGroup = false;
  mailFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public listItemService: ListItemService,
    public nMailService: NMailService,
    private loadingService: LoadingService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.mailFormGroup = this.formBuilder.group({
      info_Global: [''],
      info_Backend: [''],
      lCIn_Mail_RoleData: this.formBuilder.array([], [Validators.required, Validators.minLength(1)]),
    });
    if (this.data.mode === 'add') {
      this.setLanguageFormGroupInit();
    } else {
      this.mailFormGroup.patchValue({
        ...this.data.initData,
        info_Global: this.data.initData.info_Global === '1',
        info_Backend: this.data.initData.info_Backend === '1',
      });

      this.mailFormGroup.controls?.['info_Global'].disable();
      this.mailFormGroup.controls?.['info_Backend'].disable();

      this.data.initData.lCOut_UseRole_PageData.forEach((item: any) => {
        const role = this.roleList.find((item2: any) => item.role_Id === item2.key)

        if (role) {
          role.checked = true;
        }
      });
    }
    this.isMailFormGroup = true;
  }

  setLanguageFormGroupInit() {
    this.mailFormGroup.patchValue({
      info_Global: '0',
      info_Backend: '0',
    });
  }

  async submit() {
    this.mailFormGroup.markAllAsTouched();

    if (this.mailFormGroup.invalid) { return }

    let body: any = {
      info_Name: this.data.initData.info_Name,
      info_Global: this.mailFormGroup.getRawValue().info_Global ? '1' : '0',
      info_Backend: this.mailFormGroup.getRawValue().info_Backend ? '1' : '0',
      lCIn_Mail_RoleData: this.mailFormGroup.getRawValue().lCIn_Mail_RoleData,
    };

    this.loadingService.startLoading();

    try {
      let res;

      // if (this.data.mode === 'add') {
      //   res = await firstValueFrom(this.nMailService.add(body));
      // } else {
      //   body.cfk_Info_Id = this.data.initData.info_Id;
      //   res = await firstValueFrom(this.nMailService.edit(body));
      // }

      // const { status } = res;

      // if (status === ResponseStatus.執行成功) {
      //   let searchRes = await firstValueFrom(this.nMailService.search());
      //   this.nMailService.getTabulatorTable().setData(searchRes.data ?? []);
      //   this.close.emit();
      // }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  get f() {
    return this.mailFormGroup.controls;
  }
}
