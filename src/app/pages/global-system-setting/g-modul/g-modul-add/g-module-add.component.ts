import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// models
import * as moduleClass from 'src/app/core/models/baseAPI/module-class';

// service
import { GModuleService } from 'src/app/core/services/baseAPI/g-module.service';
import { GModuleClassService } from 'src/app/core/services/baseAPI/g-module-class.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'g-module-add',
  templateUrl: './g-module-add.component.html',
  styleUrls: ['./g-module-add.component.scss']
})
export class GModuleAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  moduleClasssearchRes: any;

  isModuleFormGroup = false;
  moduleFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public gModuleClassService: GModuleClassService,
    public gModuleService: GModuleService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getModuleClass();

    this.moduleFormGroup = this.formBuilder.group({
      fk_Modclass_Id: ['', [Validators.required]],
      mod_State: ['', [Validators.required]],
      mod_Name: ['', [Validators.required]],
      mod_Route: ['', [Validators.required]],
      mod_Order: ['', [Validators.required]],
    });
    this.isModuleFormGroup = true;
    if (this.data.mode === 'add') {
      this.setModuleFormGroupInit();
    } else {
      this.moduleFormGroup.patchValue({
        ...this.data.initData[0],
      });
    }
  }

  setModuleFormGroupInit() {
    this.moduleFormGroup.patchValue({
      fk_Modclass_Id: '',
      mod_State: '1',
      mod_Name: '',
      mod_Route: '',
      mod_Order: '0',
    });
  }

  async getModuleClass() {
    const inModuleClassSearch: moduleClass.GetRequest = {
      modClass_Name: '',
      modClass_State: '1',
    };

    this.loadingService.startLoading();

    try {
      const moduleClasssearchRes = await firstValueFrom(this.gModuleClassService.search(inModuleClassSearch));
      if (moduleClasssearchRes.status === '999') {
        this.moduleClasssearchRes = moduleClasssearchRes.data;
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }

  async submit() {
    this.moduleFormGroup.markAllAsTouched();

    if (this.moduleFormGroup.invalid) { return }

    let { mod_Order } = this.moduleFormGroup.value;

    let body: any = {
      ...this.moduleFormGroup.value,
      mod_Order: +mod_Order,
    };

    this.loadingService.startLoading();

    try {
      let res;
      if (this.data.mode === 'add') {
        res = await firstValueFrom(this.gModuleService.add(body));
      } else {
        body.mod_Id = this.data.initData[0].mod_Id;
        res = await firstValueFrom(this.gModuleService.edit(body));
      }
      const { status } = res;
      if (status === '999') {
        let searchRes = await firstValueFrom(this.gModuleService.search());
        this.gModuleService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  get f() {
    return this.moduleFormGroup.controls;
  }
}
