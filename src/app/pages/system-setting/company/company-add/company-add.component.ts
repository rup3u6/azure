import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CInCompanyPageData } from 'src/app/core/models/baseAPI/company';
import { CompanyService } from 'src/app/core/services/baseAPI/company.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss'],
})
export class CompanyAddComponent implements OnInit {
  companyAddFormGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.companyAddFormGroup = this.formBuilder.group({
      company_Name: ['', [Validators.required]],
      company_Code: ['', [Validators.required]],
      company_Sort: [0, [Validators.required]],
      company_State: ['true', [Validators.required]],
    });
  }
  @Output() close = new EventEmitter<any>();
  submit() {
    this.companyAddFormGroup.markAllAsTouched();
    if (!this.companyAddFormGroup.valid) {
      return;
    }
    let { company_State, company_Sort } = this.companyAddFormGroup.value;
    let body: CInCompanyPageData = {
      ...this.companyAddFormGroup.value,
      company_State: JSON.parse(company_State),
      company_Sort: parseInt(company_Sort),
    };
    this.loadingService.startLoading();
    this.companyService
      .add(body)
      .pipe(
        finalize(() => {
          this.loadingService.stopLoading();
        })
      )
      .subscribe((res) => {
        const { status, message } = res;
        alert(message);
        status === '999' && this.close.emit();
      });
  }
}
