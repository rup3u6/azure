import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, catchError, finalize } from 'rxjs';

// service
import { UseRoleService } from 'src/app/core/services/authAPI/use-role.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'sys-use-role-add-permission',
  templateUrl: './use-role-add-permission.component.html',
  styleUrls: ['./use-role-add-permission.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UseRoleAddPermissionComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UseRoleAddPermissionComponent),
      multi: true
    }
  ]
})
export class UseRoleAddPermissionComponent implements OnInit, ControlValueAccessor {

  onChanged: any = () => { };
  onTouched: any = () => { };

  list$ = new BehaviorSubject<any>([]);

  form!: FormGroup;
  onValidationChange!: () => void;

  constructor(
    private formBuilder: FormBuilder,
    private useRoleService: UseRoleService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.list$.next([
      {
        name: '語系設定',
        value: 11111111111111111,
        check: false,
      },
      {
        name: '區域維護',
        value: 22222222222222222,
        check: false,
      },
      {
        name: '區域帳號管理者維護',
        value: 33333333333333333,
        check: false,
      }
    ]);

    this.form = this.formBuilder.group({
      lCIn_UseRoleAuth_PageData: this.formBuilder.array([
        this.formBuilder.group({
          cfk_Role_Id: [''],
          cfk_Info_Id: ['']
        })
      ], [Validators.minLength(1)])
    });

    this.form.valueChanges.subscribe((val: any) =>
      this.onChanged(val.lCIn_UseRoleAuth_PageData)
    );
  }

  writeValue(value: any) {
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisable: boolean) {

  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { invalidValue: 'error' };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

  cfkRoleIdChange() {
    const Role_IdSelect = this.list$.value
      .filter((item: any) => item.check)
      .map((item: any) => {
        return this.formBuilder.group({
          cfk_Role_Id: item.value,
          cfk_Info_Id: item.value,
        });
      });

    this.form.setControl(
      'lCIn_UseRoleAuth_PageData',
      this.formBuilder.array(Role_IdSelect)
    );
  }
}
