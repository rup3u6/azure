//#region Create
export interface CreateRequest {
  fk_Modclass_Id: number;
  mod_State: string;
  mod_Name: string;
  mod_Route: string;
  mod_Order: number;
}

export interface CreateResponses {
  fk_Lang_Code: string;
  fk_Modclass_Id: number;
  mod_Id: number;
  mod_State: string;
  mod_Name: string;
  mod_Route: string;
  mod_Discern: string;
  mod_Order: number;
  mod_CreateId: number;
  mod_CreateCode: string;
  mod_CreateDate: number;
  mod_CreateIp: string;
  mod_EditId: number;
  mod_EditCode: string;
  mod_EditDate: number;
  mod_EditIp: string;
}
//#endregion

//#region Update
export interface UpdateRequest {
  fk_Modclass_Id: number;
  mod_State: string;
  mod_Name: string;
  mod_Route: string;
  mod_Order: number;
  mod_Id: number;
}

export interface UpdateResponses {
  mod_Id: number;
  fk_Modclass_Id: number;
  mod_State: string;
  mod_Name: string;
  mod_Route: string;
  mod_Discern: string;
  mod_StartDate: number;
  mod_EndDate: number;
  mod_Order: number;
  mod_EditCode: string;
  mod_EditId: number;
  mod_EditDate: number;
  mod_EditIp: string;
}
//#endregion

//#region Get
export interface GetRequest {
  modClass_Name: string;
  mod_Name: string;
  mod_State: string;
}

export interface GetResponses {
  mod_Id: number;
  modClass_Name: string;
  mod_Name: string;
  mod_State: string;
  mod_Order: number;
  mod_EditDate: number;
  mod_EditIp: string;
  mod_EditCode: string;
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  lPk: number;
}

export interface GetDetailResponses {
  fk_Lang_Code: string;
  fk_Modclass_Id: number;
  mod_Id: number;
  mod_State: string;
  mod_Name: string;
  mod_Route: string;
  mod_Discern: string;
  mod_Order: number;
  mod_CreateId: number;
  mod_CreateCode: string;
  mod_CreateDate: number;
  mod_CreateIp: string;
  mod_EditId: number;
  mod_EditCode: string;
  mod_EditDate: number;
  mod_EditIp: string;
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

