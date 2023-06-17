import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';

// service
import { MenuControlService } from 'src/app/core/services/menu-control.service';
import { UseRoleService } from 'src/app/core/services/authAPI/use-role.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'div[sys-use-role-add-permission]',
  templateUrl: './use-role-add-permission.component.html',
  styleUrls: ['./use-role-add-permission.component.scss'],
  host: { class: 'form-row row-1' },
})
export class UseRoleAddPermissionComponent implements OnInit {

  @Input() controlName!: string;
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  useRoleGetModuleslist$ = new BehaviorSubject<any>([]);

  constructor(
    private formBuilder: FormBuilder,
    private menuControlService: MenuControlService,
    private useRoleService: UseRoleService,
    private loadingService: LoadingService,
    private rootFormGroup: FormGroupDirective,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getUseRoleGetModules();

    if (this.data.mode === 'add') {
    } else {
      this.useRoleGetModulesChange();
    }
  }

  async getUseRoleGetModules() {
    // TODO 目前只有一組 Zone Id 有資料
    const body = {
      // lZoneId:  this.data.initData.oCTab_UseRole.fk_Zone_Id
      lZoneId: 52753953372377090
    };

    this.loadingService.startLoading();

    try {
      const useRoleGetModulesRes = await firstValueFrom(this.useRoleService.getModules(body));

      if (useRoleGetModulesRes.status === ResponseStatus.執行成功) {
        if (this.data.mode === 'edit') {
          this.data.initData.lCTab_UseRoleAuth.forEach((item: any) => {
            const useRoleGetModules = useRoleGetModulesRes.data.find((item2: any) => item.cfk_Mod_Id === item2.module_Pk)

            if (useRoleGetModules) {
              useRoleGetModules.checked = true;
            }
          });
        }

        const menuControl = this.menuControlService.createDataLevelObj(
          0,
          useRoleGetModulesRes.data,
          { _id: "module_Pk", _pid: "module_Parent", _child: "child" }
        )

        this.useRoleGetModuleslist$.next(menuControl);
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }

  useRoleGetModulesChange(useRoleGetModules?: any) {
    if (useRoleGetModules?.child.length) {
      useRoleGetModules.child.forEach((item: any) => {
        item.checked = useRoleGetModules.checked;
      });
    }

    let useRoleGetModulesSelect: any[] = [];

    this.useRoleGetModuleslist$.value.forEach((item: any) => {
      item.child.forEach((item2: any) => {
        if (item2.checked) {
          let obj;

          if (this.data.mode === 'add') {
            obj = { cfk_Mod_Id: item2.module_Pk };
          } else {
            obj = {
              cfk_Role_Id: this.data.initData.oCTab_UseRole.role_Id,
              cfk_Mod_Id: item2.module_Pk
            }
          }

          useRoleGetModulesSelect.push(this.formBuilder.group(obj));
        }
      });

      item.checked = item.child.every((item2: any) => item2.checked);
    });

    this.rootFormGroup.control.setControl(
      this.controlName,
      this.formBuilder.array(useRoleGetModulesSelect, [Validators.required, Validators.minLength(1)])
    );
  }

  get f() {
    return this.rootFormGroup.control;
  }
}
