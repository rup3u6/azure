import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';
import { GAllowlistService } from 'src/app/core/services/baseAPI/g-allowlist.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'g-allowlist-batch-add',
  templateUrl: './g-allowlist-batch-add.component.html',
  styleUrls: ['./g-allowlist-batch-add.component.scss']
})
export class GAllowlistBatchAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  roleList: any = [];

  isAllowlistFormGroup = false;
  allowlistFormGroup!: FormGroup;

  cfkZoneOption: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public listItemService: ListItemService,
    private loadingService: LoadingService,
    public gAllowlistService: GAllowlistService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.GetZoneName();

    this.allowlistFormGroup = this.formBuilder.group({
      fk_Zone_Id: ['', Validators.required],
      zone_Name: [''],
      fk_Info_Jobnumber: ['', Validators.required],
    });
    if (this.data.mode === 'add') {
      this.setAllowlistFormGroupInit();
    } else {
      this.allowlistFormGroup.patchValue({
        ...this.data.initData,
      });
    }
    this.isAllowlistFormGroup = true;
  }

  setAllowlistFormGroupInit() {
    this.allowlistFormGroup.patchValue({
      fk_Zone_Id: '',
      zone_Name: '',
      fk_Info_Jobnumber: '',
    });
  }

  async GetZoneName() {
    this.cfkZoneOption = await this.listItemService.GetZoneName();
  }

  async submit() {
    this.allowlistFormGroup.markAllAsTouched();

    if (this.allowlistFormGroup.invalid) { return }

    let body: any = {
      fk_Zone_Id: this.allowlistFormGroup.value.fk_Zone_Id,
      zone_Name: this.cfkZoneOption.find(item => item.key === this.allowlistFormGroup.value.fk_Zone_Id).value,
      fk_Info_Jobnumber: this.allowlistFormGroup.value.fk_Info_Jobnumber.split(';'),
    };

    this.loadingService.startLoading();

    try {
      let res;

      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.gAllowlistService.add(body));
      } else {
        body.cfk_Info_Id = this.data.initData.info_Id;
        res = await firstValueFrom(this.gAllowlistService.delete(body));
      }

      const { status } = res;

      if (status === ResponseStatus.執行成功) {
        let searchRes = await firstValueFrom(this.gAllowlistService.search());
        this.gAllowlistService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  get f() {
    return this.allowlistFormGroup.controls;
  }
}
