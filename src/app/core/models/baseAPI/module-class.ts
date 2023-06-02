//#region Create
export interface CreateRequest {
  modClass_Name: string;
  modClass_State: string;
  modClass_FrontBack: string;
  modClass_Order: number;
}

export interface CreateResponses {
  fk_Lang_Code: string;
  modClass_Id: number;
  modClass_State: string;
  modClass_Parent: number;
  modClass_Name: string;
  modClass_FrontBack: string;
  modClass_Order: number;
  modClass_CreateId: number;
  modClass_CreateCode: string;
  modClass_CreateDate: number;
  modClass_CreateIp: string;
  modClass_EditId: number;
  modClass_EditCode: string;
  modClass_EditDate: number;
  modClass_EditIp: string;
}
//#endregion

//#region Update
export interface UpdateRequest {
  modClass_Name: string;
  modClass_State: string;
  modClass_FrontBack: string;
  modClass_Order: number;
  modClass_Id: number;
}

export interface UpdateResponses {
  modClass_Id: number;
  modClass_State: string;
  modClass_Parent: number;
  modClass_Name: string;
  modClass_FrontBack: string;
  modClass_Order: number;
  modClass_EditId: number;
  modClass_EditDate: number;
  modClass_EditIp: string;
  modClass_CreateCode: string;
  modClass_EditCode: string;
}
//#endregion

//#region Get
export interface GetRequest {
  modClass_Name: string;
  modClass_State: string;
}

export interface GetResponses {
  fk_Lang_Code: string;
  modClass_Id: number;
  modClass_State: string;
  modClass_Parent: number;
  modClass_Name: string;
  modClass_FrontBack: string;
  modClass_Order: number;
  modClass_CreateId: number;
  modClass_CreateCode: string;
  modClass_CreateDate: number;
  modClass_CreateIp: string;
  modClass_EditId: number;
  modClass_EditCode: string;
  modClass_EditDate: number;
  modClass_EditIp: string;
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  modClass_Id: number;
}

export interface GetDetailResponses {
  fk_Lang_Code: string;
  modClass_Id: number;
  modClass_State: string;
  modClass_Parent: number;
  modClass_Name: string;
  modClass_FrontBack: string;
  modClass_Order: number;
  modClass_CreateId: number;
  modClass_CreateCode: string;
  modClass_CreateDate: number;
  modClass_CreateIp: string;
  modClass_EditId: number;
  modClass_EditCode: string;
  modClass_EditDate: number;
  modClass_EditIp: string;
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

