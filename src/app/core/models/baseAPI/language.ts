//#region Create
export interface CreateRequest {
  lang_State: string;
  lang_Name: string;
  lang_Code: string;
  i18N_Front: string;
  i18N_Back: string;
}

export interface CreateResponses {
  lang_Code: string;
  lang_State: string;
  lang_Name: string;
  i18N_Front: string;
  i18N_Back: string;
  lang_CreateId: number;
  lang_CreateCode: string;
  lang_CreateDate: number;
  lang_CreateIp: string;
  lang_EditId: number;
  lang_EditCode: string;
  lang_EditDate: number;
  lang_EditIp: string;
}
//#endregion

//#region Update
export interface UpdateRequest {
  lang_State: string;
  lang_Name: string;
  lang_Code: string;
  i18N_Front: string;
  i18N_Back: string;

}

export interface UpdateResponses {
  lang_Id: number;
  lang_State: string;
  lang_Name: string;
  lang_Code: string;
  lang_EditId: number;
  lang_EditCode: string;
  lang_EditDate: number;
  lang_EditIp: string;
}
//#endregion

//#region Get
export interface GetRequest {
  lang_State: string;
  lang_Name: string;
  lang_Code: string;
}

export interface GetResponses {
  lang_Code: string;
  lang_State: string;
  lang_Name: string;
  i18N_Front: string;
  i18N_Back: string;
  lang_CreateId: number;
  lang_CreateCode: string;
  lang_CreateDate: number;
  lang_CreateIp: string;
  lang_EditId: number;
  lang_EditCode: string;
  lang_EditDate: number;
  lang_EditIp: string;
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  lang_Code: string;
}

export interface GetDetailResponses {
  lang_Code: string;
  lang_State: string;
  lang_Name: string;
  i18N_Front: string;
  i18N_Back: string;
  lang_CreateId: number;
  lang_CreateCode: string;
  lang_CreateDate: number;
  lang_CreateIp: string;
  lang_EditId: number;
  lang_EditCode: string;
  lang_EditDate: number;
  lang_EditIp: string;
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

