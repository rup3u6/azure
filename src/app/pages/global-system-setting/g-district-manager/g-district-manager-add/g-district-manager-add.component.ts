import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';
import { GDistrictManagerService } from 'src/app/core/services/baseAPI/g-district-manager.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'g-district-manager-add',
  templateUrl: './g-district-manager-add.component.html',
  styleUrls: ['./g-district-manager-add.component.scss']
})
export class GDistrictManagerAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  isDistrictManagerFormGroup = false;
  districtManagerFormGroup!: FormGroup;

  zoneList: any[] = [];
  accountNameList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public listItemService: ListItemService,
    public gDistrictManagerService: GDistrictManagerService,
    private loadingService: LoadingService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.GetZoneName();
    await this.getAccountName();

    this.districtManagerFormGroup = this.formBuilder.group({
      fk_Zone_Id: ['', Validators.required],
      fk_Info_Id: ['', Validators.required],
      info_Jobnumber: [''],
      info_Name: [''],
    });
    if (this.data.mode === 'add') {
      this.setDistrictManagerFormGroupInit();
    } else {
      this.districtManagerFormGroup.patchValue({
        ...this.data.initData,
      });
    }
    this.isDistrictManagerFormGroup = true;
  }

  setDistrictManagerFormGroupInit() {
    this.districtManagerFormGroup.patchValue({
      fk_Zone_Id: '',
      fk_Info_Id: '',
      info_Jobnumber: '',
      info_Name: '',
    });
  }

  async GetZoneName() {
    this.zoneList = await this.listItemService.GetZoneName();
  }

  async getAccountName() {
    this.accountNameList = await this.listItemService.getAccountName();
  }

  async submit() {
    this.districtManagerFormGroup.markAllAsTouched();

    if (this.districtManagerFormGroup.invalid) { return }

    const accountName = this.accountNameList.find(item => item.key === this.districtManagerFormGroup.value.fk_Info_Id);

    let body: any = {
      ... this.districtManagerFormGroup.value,
      info_Jobnumber: accountName.value.split('(')[0],
      info_Name: accountName.value.split('(')[1].slice(0, -1),
    };

    this.loadingService.startLoading();

    try {
      let res;

      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.gDistrictManagerService.add(body));
      } else {
        body.pk_DistMgr = this.data.initData.pk_DistMgr;
        res = await firstValueFrom(this.gDistrictManagerService.edit(body));
      }

      const { status } = res;

      if (status === ResponseStatus.執行成功) {
        let searchRes = await firstValueFrom(this.gDistrictManagerService.search());
        this.gDistrictManagerService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  get f() {
    return this.districtManagerFormGroup.controls;
  }
}
