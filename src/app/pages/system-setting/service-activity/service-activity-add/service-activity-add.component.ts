import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';
import { ServiceActivityService } from 'src/app/core/services/activityAPI/service-activity.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'sys-service-activity-add',
  templateUrl: './service-activity-add.component.html',
  styleUrls: ['./service-activity-add.component.scss']
})
export class ServiceActivityAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  isDistrictManagerFormGroup = false;
  districtManagerFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public listItemService: ListItemService,
    public serviceActivityService: ServiceActivityService,
    private loadingService: LoadingService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.districtManagerFormGroup = this.formBuilder.group({
      srvAct_Type: ['', Validators.required],
      srvAct_Name: ['', Validators.required],
      srvAct_State: ['', Validators.required],
    });
    if (this.data.mode === 'add') {
      this.setDistrictManagerFormGroupInit();
    } else {
      this.districtManagerFormGroup.controls?.['srvAct_Type'].disable();

      this.districtManagerFormGroup.patchValue({
        ...this.data.initData,
      });
    }
    this.isDistrictManagerFormGroup = true;
  }

  setDistrictManagerFormGroupInit() {
    this.districtManagerFormGroup.patchValue({
      srvAct_Type: '',
      srvAct_Name: '',
      srvAct_State: '1',
    });
  }

  async submit() {
    this.districtManagerFormGroup.markAllAsTouched();

    if (this.districtManagerFormGroup.invalid) { return }

    let body: any = {
      ... this.districtManagerFormGroup.value,
    };

    this.loadingService.startLoading();

    try {
      let res;

      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.serviceActivityService.add(body));
      } else {
        body.pk_SrvAct = this.data.initData.pk_SrvAct;
        res = await firstValueFrom(this.serviceActivityService.edit(body));
      }

      const { status } = res;

      if (status === ResponseStatus.執行成功) {
        let searchRes = await firstValueFrom(this.serviceActivityService.search());
        this.serviceActivityService.getTabulatorTable().setData(searchRes.data ?? []);
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
