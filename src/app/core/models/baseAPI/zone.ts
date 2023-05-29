export interface CInZoneSearch {
  oCIn_WfZone_PageData: CoCIn_WfZone_PageData;
  lCIn_Wf_Zone_Site_Pagedata: ClCIn_Wf_Zone_Site_Pagedata;
  lCIn_Wf_Zone_Langue_Pagedata: ClCIn_Wf_Zone_Langue_Pagedata;
}

export interface CoCIn_WfZone_PageData {
  zone_State: string;
  zone_Name: string;
  zone_Sort: number;
  fk_Lang_Code: string;
}

export interface ClCIn_Wf_Zone_Site_Pagedata {
  ck_Site: string;
}

export interface ClCIn_Wf_Zone_Langue_Pagedata {
  cfk_Lang_Code: string;
}
