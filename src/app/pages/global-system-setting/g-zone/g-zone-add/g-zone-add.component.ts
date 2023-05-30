import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

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

  LanguagesearchRes: any;

  isZoneFormGroup = false;
  zoneFormGroup!: FormGroup;

  ckSiteOption: any[] = ['台北', '新北'];
  ckSiteSelectedValue: any[] = [];

  cfkLangCodeOption: any[] = [];
  cfkLangCodeSelectedValue: any[] = [];
  cfkLangCodeSelectedValueCode: any[] = [];

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
        zone_State: [''],
        zone_Name: [''],
        zone_Sort: [''],
        fk_Lang_Code: [''],
      }),
      lCIn_Wf_Zone_Site_Pagedata: this.formBuilder.group({
        ck_Site: ['']
      }),
      lCIn_Wf_Zone_Langue_Pagedata: this.formBuilder.group({
        cfk_Lang_Code: ['']
      }),
    });

    if (this.data.mode === 'add') {
      this.setZoneFormGroupInit();
      this.cfkLangCodeSelectedValue = await ['英文-EN'];
      this.setcfkLangCode();
    } else {
      this.zoneFormGroup.setControl(
        'oCIn_WfZone_PageData',
        this.formBuilder.group(this.data.initData.oCOut_WfZone_GetDetailPageData)
      );

      this.ckSiteSelectedValue =
        this.data.initData.lCOut_Wf_Zone_Site_GetDetailPageData.map((item: any) => item.ck_Site);
      this.setCkSite();

      this.cfkLangCodeSelectedValue =
        await this.data.initData.lCOut_Wf_Zone_Langue_GetDetail.map((item: any) => {
          const lang = this.LanguagesearchRes.find((item2: any) => item2.lang_Code === item.cfk_Lang_Code)

          return lang.lang_Name + '-' + lang.lang_Code;
        });

      if (!this.cfkLangCodeSelectedValue.some((item) => item === '英文-EN')) {
        this.cfkLangCodeSelectedValue.push('英文-EN');
      }

      this.setcfkLangCode();
    }

    this.isZoneFormGroup = true;
  }

  setZoneFormGroupInit() {
    this.zoneFormGroup.patchValue({
      oCIn_WfZone_PageData: {
        zone_State: '1',
        zone_Name: '',
        zone_Sort: 0,
        fk_Lang_Code: 'EN',
      },
      lCIn_Wf_Zone_Site_Pagedata: [
        {
          ck_Site: ""
        }
      ],
      lCIn_Wf_Zone_Langue_Pagedata: [
        {
          cfk_Lang_Code: ""
        }
      ],
    });
  }

  setCkSite() {
    this.zoneFormGroup.setControl(
      'lCIn_Wf_Zone_Site_Pagedata',
      this.formBuilder.array(
        this.ckSiteSelectedValue.map(r => this.formBuilder.group({ ck_Site: r }))
      ));
  }

  setcfkLangCode() {
    this.zoneFormGroup.setControl(
      'lCIn_Wf_Zone_Langue_Pagedata',
      this.formBuilder.array(
        this.cfkLangCodeSelectedValue.map(r => this.formBuilder.group({ cfk_Lang_Code: r }))));

    this.cfkLangCodeSelectedValueCode = this.cfkLangCodeSelectedValue.map((item: any) => {
      return { lang_Name: item.split('-')[0], lang_Code: item.split('-')[1] };
    });
  }

  async getLanguage() {
    const languagesearchRes = await firstValueFrom(this.gLanguageService.search(true));

    if (languagesearchRes.status === '999') {
      this.LanguagesearchRes = languagesearchRes.data;
      this.cfkLangCodeOption = await this.LanguagesearchRes.map((item: any) => item.lang_Name + '-' + item.lang_Code) ?? [];
    }
  }

  async submit() {
    this.loadingService.startLoading();

    try {
      let res;

      if (this.data.mode === 'add') {
        let body: any = {
          ...this.zoneFormGroup.value,
          lCIn_Wf_Zone_Site_Pagedata: this.ckSiteSelectedValue.map((item) => { return { ck_Site: item } }),
          lCIn_Wf_Zone_Langue_Pagedata: this.cfkLangCodeSelectedValueCode.map((item) => { return { cfk_Lang_Code: item.lang_Code } })
        };
        res = await firstValueFrom(this.gZoneService.add(body));
      } else {
        let body: any = {
          oCIn_WfZone_PageData_Update: this.zoneFormGroup.value.oCIn_WfZone_PageData,
          lCIn_Wf_Zone_Site_Pagedata_Update: this.ckSiteSelectedValue.map((item) => { return { ck_Site: item } }),
          lCIn_Wf_Zone_Langue_Pagedata_Update: this.cfkLangCodeSelectedValueCode.map((item) => { return { cfk_Lang_Code: item.lang_Code } })
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
}
