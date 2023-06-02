//#region Create
export interface CreateRequest {
  oCIn_WfZone_PageData: CreateOCIn_WfZone_PageData;
  lCIn_Wf_Zone_Site_Pagedata: CreateLCIn_Wf_Zone_Site_Pagedata[];
  lCIn_Wf_Zone_Langue_Pagedata: CreateLCIn_Wf_Zone_Langue_Pagedata[];
}

export interface CreateOCIn_WfZone_PageData {
  zone_State: string;
  zone_Name: string;
  zone_Sort: number;
  fk_Lang_Code: string;
}

export interface CreateLCIn_Wf_Zone_Site_Pagedata {
  ck_Site: string;

}

export interface CreateLCIn_Wf_Zone_Langue_Pagedata {
  cfk_Lang_Code: string;
}

export interface CreateResponses {
  oCOut_WfZone_PageData: CreateOCOutWfZonePageData;
  cOut_Wf_Zone_Site_Pagedata: CreateCOut_Wf_Zone_Site_Pagedata[];
  lCOut_Wf_Zone_Langue_Pagedata: CreateLCOut_Wf_Zone_Langue_Pagedata[];
}

export interface CreateOCOutWfZonePageData {
  zone_Id: 45196569535975420,
  zone_State: string;
  zone_Name: string;
  zone_Sort: 1000,
  fk_Lang_Code: string;
  zone_CreateId: 24148002872627200,
  zone_CreateCode: string;
  zone_CreateDate: 1682585536,
  zone_CreateIp: string;
  zone_EditId: 24148002872627200,
  zone_EditCode: string;
  zone_EditDate: 1682585536,
  zone_EditIp: string;
}

export interface CreateCOut_Wf_Zone_Site_Pagedata {
  cfk_Zone_Id: 45196569535975420,
  ck_Site: string;
}

export interface CreateLCOut_Wf_Zone_Langue_Pagedata {
  cfk_Zone_Id: 45196569535975420,
  cfk_Lang_Code: string;
}
//#endregion

//#region Update
export interface UpdateRequest {
  oCIn_WfZone_PageData_Update: UpdateOCIn_WfZone_PageData_Update;
  lCIn_Wf_Zone_Site_Pagedata_Update: UpdateLCIn_Wf_Zone_Site_Pagedata_Update[];
  lCIn_Wf_Zone_Langue_Pagedata_Update: UpdateLCIn_Wf_Zone_Langue_Pagedata_Update[];
}

export interface UpdateOCIn_WfZone_PageData_Update {
  zone_Id: 45196569535975420,
  zone_State: string;
  zone_Name: string;
  zone_Sort: 1000,
  fk_Lang_Code: string;
}

export interface UpdateLCIn_Wf_Zone_Site_Pagedata_Update {
  ck_Site: string;
}

export interface UpdateLCIn_Wf_Zone_Langue_Pagedata_Update {
  cfk_Lang_Code: string;
}

export interface UpdateResponses {
  oCOut_WfZone_PageData_Update: UpdateOCOut_WfZone_PageData_Update;
  lCOut_Wf_Zone_Site_Pagedata_Update: UpdateLCOut_Wf_Zone_Site_Pagedata_Update[];
  lCOut_Wf_Zone_Langue_Pagedata_Update: UpdateLCOut_Wf_Zone_Langue_Pagedata_Update[];
}

export interface UpdateOCOut_WfZone_PageData_Update {
  zone_Id: 45196569535975420,
  zone_State: string;
  zone_Name: string;
  zone_Sort: 1000,
  fk_Lang_Code: string;
  zone_EditId: 24148002872627200,
  zone_EditCode: string;
  zone_EditDate: 1682585536,
  zone_EditIp: string;
}

export interface UpdateLCOut_Wf_Zone_Site_Pagedata_Update {
  cfk_Zone_Id: 45196569535975420,
  ck_Site: string;
}

export interface UpdateLCOut_Wf_Zone_Langue_Pagedata_Update {
  cfk_Zone_Id: 45196569535975420,
  cfk_Lang_Code: string;
}

//#endregion

//#region Get
export interface GetRequest {
  zone_State: string;
  zone_Name: string;
}

export interface GetResponses {
  zone_Id: 45196569535975420,
  zone_Name: string;
  zone_State: string;
  zone_Sort: 1000,
  zone_EditDate: 1682585536,
  zone_EditCode: string;
  zone_EditIp: string;
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  zone_Id: 45196569535975420
}

export interface GetDetailResponses {
  oCOut_WfZone_GetDetailPageData: GetDetailOCOut_WfZone_GetDetailPageData;
  lCOut_Wf_Zone_Site_GetDetailPageData: GetDetailLCOut_Wf_Zone_Site_GetDetailPageData[];
  lCOut_Wf_Zone_Langue_GetDetail: GetDetailLCOut_Wf_Zone_Langue_GetDetail[];
}

export interface GetDetailOCOut_WfZone_GetDetailPageData {
  zone_Id: 45196569535975420,
  zone_State: string;
  zone_Name: string;
  zone_Sort: 1000,
  fk_Lang_Code: string;
}

export interface GetDetailLCOut_Wf_Zone_Site_GetDetailPageData {
  ck_Site: string;
}

export interface GetDetailLCOut_Wf_Zone_Langue_GetDetail {
  cfk_Lang_Code: string;
}
//#endregion

//#region ConvertState
export interface ConvertStateRequest {
  lCIn_ConvertState_PageData: ConvertStateLCIn_ConvertState_PageData[];
  sState: string;
}

export interface ConvertStateLCIn_ConvertState_PageData {
  lPk: string;
  sName: string;
}
//#endregion

