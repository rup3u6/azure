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
  cfk_Site: string;
  ck_Location_Code: string;
  location_Name: string;
  location_EnglishName: string;
  location_Area: string;
  location_Company: string;
  location_State: string;
  location_Id: number;
}

export interface UpdateResponses {
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

//#region Get
export interface GetRequest {
  location_State: boolean;
  location_Name: string;
  location_Code: string;
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

//#region GetDetail
export interface GetDetailRequest {
  lPk: string;
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
  lPk: number;
  bState: string;
}

export interface ConvertStateResponses {
  location_Id: number;
  location_State: boolean;
  location_EditCode: string;
  location_EditId: number;
  location_EditDate: number;
  location_EditIp: string;
}
//#endregion

