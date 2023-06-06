//#region Create
export interface CreateRequest {
  cfk_Site: string;
  ck_Location_Code: string;
  location_Name: string;
  location_EnglishName: string;
  location_Area: string;
  location_Company: string;
  location_State: string;
}

export interface CreateResponses {
  cfk_Zone_Id: number;
  cfk_Site: string;
  fk_Lang_Code: string;
  ck_Location_Code: string;
  location_Name: string;
  location_State: string;
  location_EnglishName: string;
  location_Area: string;
  location_Company: string;
  location_CreateId: number;
  location_CreateCode: string;
  location_CreateDate: number;
  location_CreateIp: string;
  location_EditId: number;
  location_EditCode: string;
  location_EditDate: number;
  location_EditIp: string;
}
//#endregion

//#region Update
export interface UpdateRequest {
  cfk_Zone_Id: number;
  cfk_Site: string;
  ck_Location_Code: string;
  location_Name: string;
  location_EnglishName: string;
  location_Area: string;
  location_Company: string;
  location_State: string;
}

export interface UpdateResponses {
  cfk_Site: string;
  ck_Location_Code: string;
  location_Name: string;
  location_EnglishName: string;
  location_Area: string;
  location_Company: string;
  location_State: string;
  location_EditId: number;
  location_EditCode: string;
  location_EditDate: number;
  location_EditIp: string;
}
//#endregion

//#region Get
export interface GetRequest {
  ck_Location_Code: string;
  cfk_Site: string;
  location_State: string;
}

export interface GetResponses {
  cfk_Zone_Id: number;
  cfk_Site: string;
  fk_Lang_Code: string;
  ck_Location_Code: string;
  location_Name: string;
  location_State: string;
  location_EnglishName: string;
  location_Area: string;
  location_Company: string;
  location_EditId: number;
  info_Jobnumber: string;
  location_EditCode: string;
  location_EditDate: number;
  location_EditIp: string;
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  cfk_Zone_Id: number;
  cfk_Site: string;
  ck_Location_Code: string;
}

export interface GetDetailResponses {
  cfk_Zone_Id: number;
  cfk_Site: string;
  fk_Lang_Code: string;
  ck_Location_Code: string;
  location_Name: string;
  location_State: string;
  location_EnglishName: string;
  location_Area: string;
  location_Company: string;
  location_CreateId: number;
  location_CreateCode: string;
  location_CreateDate: number;
  location_CreateIp: string;
  location_EditId: number;
  location_EditCode: string;
  location_EditDate: number;
  location_EditIp: string;
}
//#endregion

//#region ConvertState
export interface ConvertStateRequest {
  cIn_WfLocation_ConvertState_Pk: ConvertStateCIn_WfLocation_ConvertState_Pk[];
  sState: string;
}

export interface ConvertStateCIn_WfLocation_ConvertState_Pk {
  cfk_Zone_Id: number;
  cfk_Site: string;
  ck_Location_Code: string;
  location_Name: string;
}

//#endregion
