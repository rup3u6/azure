import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// models
import * as language from 'src/app/core/models/baseAPI/language';

// service
import { GZoneService } from 'src/app/core/services/baseAPI/g-zone.service';
import { GLanguageService } from 'src/app/core/services/baseAPI/g-language.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'g-zone-add',
  templateUrl: './g-zone-add.component.html',
  styleUrls: ['./g-zone-add.component.scss']
})
export class GZoneAddComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() data: any = {
    mode: '',
    initData: {},
  };

  languagesearchRes: any;

  isZoneFormGroup = false;
  zoneFormGroup!: FormGroup;

  ckSiteOption: any[] = ['台北', '新北'];
  cfkLangCodeOption: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public gZoneService: GZoneService,
    public gLanguageService: GLanguageService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getLanguage();

    this.zoneFormGroup = this.formBuilder.group({
      oCIn_WfZone_PageData: this.formBuilder.group({
        zone_State: ['', [Validators.required]],
        zone_Name: ['', [Validators.required]],
        zone_Sort: ['', [Validators.required]],
        fk_Lang_Code: ['', [Validators.required]],
      }),
      lCIn_Wf_Zone_Site_Pagedata: [[], [Validators.required]],
      lCIn_Wf_Zone_Langue_Pagedata: [[], [Validators.required]],
    });

    if (this.data.mode === 'add') {
      this.setZoneFormGroupInit();
    } else {
      // site 設定
      const ckSiteSelectedValue = this.data.initData.lCOut_Wf_Zone_Site_GetDetailPageData.map((item: any) => item.ck_Site);

      // 區域語系
      let cfkLangCodeSelectedValue = this.data.initData.lCOut_Wf_Zone_Langue_GetDetail.map((item: any) => item.cfk_Lang_Code);
      if (!cfkLangCodeSelectedValue.some((item: any) => item === 'en')) {
        cfkLangCodeSelectedValue.push('en');
      }

      this.zoneFormGroup.patchValue({
        oCIn_WfZone_PageData: { ...this.data.initData.oCOut_WfZone_GetDetailPageData },
        lCIn_Wf_Zone_Site_Pagedata: ckSiteSelectedValue,
        lCIn_Wf_Zone_Langue_Pagedata: cfkLangCodeSelectedValue,
      });
    }

    this.isZoneFormGroup = true;
  }

  setZoneFormGroupInit() {
    this.zoneFormGroup.patchValue({
      oCIn_WfZone_PageData: {
        zone_State: '1',
        zone_Name: '',
        zone_Sort: '0',
        fk_Lang_Code: 'en',
      },
      lCIn_Wf_Zone_Site_Pagedata: [],
      lCIn_Wf_Zone_Langue_Pagedata: ['en'],
    });
  }

  async getLanguage() {
    const inLanguageSearch: language.GetRequest = {
      lang_State: '1',
      lang_Name: '',
      lang_Code: '',
    };

    this.loadingService.startLoading();

    try {
      const languagesearchRes = await firstValueFrom(this.gLanguageService.search(inLanguageSearch));
      if (languagesearchRes.status === '999') {
        this.languagesearchRes = languagesearchRes.data;
        this.cfkLangCodeOption = this.languagesearchRes.map((item: language.GetResponses) => {
          return {
            lang_Name: item.lang_Name + '-' + item.lang_Code,
            lang_Code: item.lang_Code
          }
        }) ?? [];
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }
  }

  async submit() {
    this.zoneFormGroup.markAllAsTouched();

    if (this.zoneFormGroup.invalid) { return }

    this.loadingService.startLoading();

    try {
      let res;

      if (this.data.mode === 'add') {
        let body: any = {
          ...this.zoneFormGroup.value,
          lCIn_Wf_Zone_Site_Pagedata: this.zoneFormGroup.value.lCIn_Wf_Zone_Site_Pagedata.map((item: any) => { return { ck_Site: item } }),
          lCIn_Wf_Zone_Langue_Pagedata: this.zoneFormGroup.value.lCIn_Wf_Zone_Langue_Pagedata.map((item: any) => { return { cfk_Lang_Code: item } })
        };
        res = await firstValueFrom(this.gZoneService.add(body));
      } else {
        let body: any = {
          oCIn_WfZone_PageData_Update: this.zoneFormGroup.value.oCIn_WfZone_PageData,
          lCIn_Wf_Zone_Site_Pagedata_Update: this.zoneFormGroup.value.lCIn_Wf_Zone_Site_Pagedata.map((item: any) => { return { ck_Site: item } }),
          lCIn_Wf_Zone_Langue_Pagedata_Update: this.zoneFormGroup.value.lCIn_Wf_Zone_Langue_Pagedata.map((item: any) => { return { cfk_Lang_Code: item } })
        };
        res = await firstValueFrom(this.gZoneService.edit(body));
      }
      const { status } = res;
      if (status === '999') {
        let searchRes = await firstValueFrom(this.gZoneService.search());
        this.gZoneService.getTabulatorTable().setData(searchRes.data ?? []);
        this.close.emit();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.stopLoading();
    }
  }

  get f() {
    return this.zoneFormGroup.controls;
  }
}
