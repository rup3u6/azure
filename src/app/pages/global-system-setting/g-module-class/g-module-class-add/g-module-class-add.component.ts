import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';
import { GModuleClassService } from 'src/app/core/services/baseAPI/g-module-class.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'g-module-class-add',
  templateUrl: './g-module-class-add.component.html',
  styleUrls: ['./g-module-class-add.component.scss']
})
export class GModuleClassAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  moduleClassFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public gModuleClassService: GModuleClassService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.moduleClassFormGroup = this.formBuilder.group({
      modClass_Name: [''],
      modClass_State: [''],
      modClass_FrontBack: [''],
      modClass_Order: [''],
    });
    if (this.data.mode === 'add') {
      this.setModuleClassFormGroupInit();
    } else {
      this.moduleClassFormGroup.patchValue({
        ...this.data.initData,
      });
    }
  }

  setModuleClassFormGroupInit() {
    this.moduleClassFormGroup.patchValue({
      modClass_Name: '',
      modClass_State: '1',
      modClass_FrontBack: '1',
      modClass_Order: '',
    });
  }

  async submit() {
    let { modClass_Order } = this.moduleClassFormGroup.value;

    let body: any = {
      ...this.moduleClassFormGroup.value,
      modClass_Order: +modClass_Order
    };
    this.loadingService.startLoading();
    try {
      let res;
      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.gModuleClassService.add(body));
      } else {
        body.modClass_Id = this.data.initData.modClass_Id;
        res = await firstValueFrom(this.gModuleClassService.edit(body));
      }
      const { status } = res;
      if (status === '999') {
        let searchRes = await firstValueFrom(this.gModuleClassService.search());
        this.gModuleClassService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
