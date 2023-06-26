import { Component, Input, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// service
import { MenuControlService } from 'src/app/core/services/menu-control.service';
import { GZoneService } from 'src/app/core/services/baseAPI/g-zone.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[g-zone-add-permission]',
  templateUrl: './g-zone-add-permission.component.html',
  styleUrls: ['./g-zone-add-permission.component.scss'],
  host: { class: 'form-row row-1' },
})
export class GZoneAddPermissionComponent implements OnInit {

  @Input() controlName!: string;
  @Input() sFrontBack!: string; // 0:後台，1:前台
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  zoneGetModuleslist$ = new BehaviorSubject<any>([]);

  constructor(
    private formBuilder: FormBuilder,
    private menuControlService: MenuControlService,
    private gZoneService: GZoneService,
    private loadingService: LoadingService,
    private rootFormGroup: FormGroupDirective,
  ) { }

  async ngOnInit(): Promise<void> {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sFrontBack'].firstChange) {
      const sFrontBack = changes['sFrontBack'].currentValue;

      this.getZoneGetModules(sFrontBack);
    }
  }

  async getZoneGetModules(sFrontBack: string) {
    const body = {
      sFrontBack
    };

    this.loadingService.startLoading();

    try {
      const zoneGetModulesRes = await firstValueFrom(this.gZoneService.GetModules(body));

      if (zoneGetModulesRes.status === ResponseStatus.執行成功) {
        if (this.data.mode === 'edit') {
          this.data.initData.lCOut_Wf_Zone_Module_GetDetail.forEach((item: any) => {
            const zoneGetModules = zoneGetModulesRes.data.find((item2: any) => item.cfk_Mod_Id === item2.module_Pk)

            if (zoneGetModules) {
              zoneGetModules.checked = true;
            }
          });
        }

        const menuControl = this.menuControlService.createDataLevelObj(
          0,
          zoneGetModulesRes.data,
        )

        this.zoneGetModuleslist$.next(menuControl);

        if (this.data.mode === 'edit') {
          this.zoneGetModulesChange();
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }

  zoneGetModulesChange(zoneGetModules?: any) {
    if (zoneGetModules?.child.length) {
      zoneGetModules.child.forEach((item: any) => {
        item.checked = zoneGetModules.checked;
      });
    }

    let zoneGetModulesSelect: any[] = [];

    this.zoneGetModuleslist$.value.forEach((item: any) => {
      item.child.forEach((item2: any) => {
        if (item2.checked) {
          zoneGetModulesSelect.push(
            this.formBuilder.group({
              cfk_Mod_Id: item2.module_Pk
            })
          );
        }
      });

      item.checked = item.child.every((item2: any) => item2.checked);
    });

    this.rootFormGroup.control.setControl(
      this.controlName,
      this.formBuilder.array(zoneGetModulesSelect, this.f?.validator)
    );
  }

  get f() {
    return this.rootFormGroup.control.get(this.controlName);
  }
}
