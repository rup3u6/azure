import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, firstValueFrom } from 'rxjs';

// enum
import { ResponseStatus } from 'src/app/core/enum/response-status';
import { Common } from 'src/app/core/enum/list-item';
import { Message } from 'src/app/core/enum/message';

// models
import * as language from 'src/app/core/models/baseAPI/language';

// service
import { ListItemService } from 'src/app/core/services/baseAPI/list-item.service';
import { ManagerInfoService } from 'src/app/core/services/authAPI/manager-info.service';
import { GZoneService } from 'src/app/core/services/baseAPI/g-zone.service';
import { GLanguageService } from 'src/app/core/services/baseAPI/g-language.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { TranslateService } from '@ngx-translate/core';

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

  tab = 1;

  languagesearchRes: any;

  isZoneFormGroup = false;
  zoneFormGroup!: FormGroup;

  ckSiteOption: any[] = [];
  cfkLangCodeOption: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private listItemService: ListItemService,
    public managerInfoService: ManagerInfoService,
    private gZoneService: GZoneService,
    private gLanguageService: GLanguageService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private translateService:TranslateService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getSite();
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
      lCIn_Wf_Zone_Module_Pagedata_f: [[], [Validators.required, Validators.minLength(1)]],
      lCIn_Wf_Zone_Module_Pagedata_b: [[], [Validators.required, Validators.minLength(1)]],
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
      lCIn_Wf_Zone_Module_Pagedata_f: [],
      lCIn_Wf_Zone_Module_Pagedata_b: [],
    });
  }

  async getSite() {
    this.ckSiteOption = await this.listItemService.getSite();
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
      if (languagesearchRes.status === ResponseStatus.執行成功) {
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

  tabChange(index: number) {
    this.tab = index;
  }

  async showError() {
    let msgList!: string[];

    const IsShareError =
      this.f['oCIn_WfZone_PageData'].errors ||
      this.f['lCIn_Wf_Zone_Site_Pagedata'].errors ||
      this.f['lCIn_Wf_Zone_Langue_Pagedata'].errors;
    const Istab1Error = this.f['lCIn_Wf_Zone_Module_Pagedata_f'].errors;
    const Istab2Error = this.f['lCIn_Wf_Zone_Module_Pagedata_b'].errors;

    switch (this.tab) {
      case 1:
        if (IsShareError || Istab1Error) { return; }
        if (Istab2Error) {
          this.tabChange(2);
          msgList = [this.translateService.instant("ERRORS.BACK_SIDE_MENU_SETTING")];
        }
        break;
      case 2:
        if (IsShareError || Istab2Error) { return; }
        if (Istab1Error) {
          this.tabChange(1);
          msgList = [this.translateService.instant("ERRORS.FRONT_SIDE_MENU_SETTING")];
        }
        break;
    }

    if (msgList.length) {
      this.messageService.showModal(Message.error, {
        title: this.translateService.instant("ERRORS.TITLE.900"),
        msgList: msgList,
      });
    }
  }

  async submit() {
    this.zoneFormGroup.markAllAsTouched();

    if (this.zoneFormGroup.invalid) {
      this.showError();

      return
    }

    this.loadingService.startLoading();

    try {
      const lCIn_Wf_Zone_Site_Pagedata = this.zoneFormGroup.value.lCIn_Wf_Zone_Site_Pagedata.map((item: any) => { return { ck_Site: item } });
      const lCIn_Wf_Zone_Langue_Pagedata = this.zoneFormGroup.value.lCIn_Wf_Zone_Langue_Pagedata.map((item: any) => { return { cfk_Lang_Code: item } });
      const lCIn_Wf_Zone_Module_Pagedata = this.zoneFormGroup.value.lCIn_Wf_Zone_Module_Pagedata_f
        .concat(this.zoneFormGroup.value.lCIn_Wf_Zone_Module_Pagedata_b)

      let res;

      if (this.data.mode === 'add') {
        let body: any = {
          oCIn_WfZone_PageData: this.zoneFormGroup.value.oCIn_WfZone_PageData,
          lCIn_Wf_Zone_Site_Pagedata,
          lCIn_Wf_Zone_Langue_Pagedata,
          lCIn_Wf_Zone_Module_Pagedata
        };
        res = await firstValueFrom(this.gZoneService.add(body));
      } else {
        let body: any = {
          oCIn_WfZone_PageData_Update: this.zoneFormGroup.value.oCIn_WfZone_PageData,
          lCIn_Wf_Zone_Site_Pagedata_Update: lCIn_Wf_Zone_Site_Pagedata,
          lCIn_Wf_Zone_Langue_Pagedata_Update: lCIn_Wf_Zone_Langue_Pagedata,
          lCIn_Wf_Zone_Module_Pagedata_Update: lCIn_Wf_Zone_Module_Pagedata,
        };
        body.oCIn_WfZone_PageData_Update.zone_Id = this.data.initData.oCOut_WfZone_GetDetailPageData.zone_Id;

        res = await firstValueFrom(this.gZoneService.edit(body));
      }
      const { status } = res;
      if (status === ResponseStatus.執行成功) {
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
