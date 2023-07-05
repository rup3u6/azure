//#region Create
export interface CreateRequest {
  fk_Zone_Id: number;
  fk_Info_Id: number;
  info_Jobnumber: string;
  info_Name: string;
}
//#endregion

//#region Update
export interface UpdateRequest {
  fk_Zone_Id: number;
  fk_Info_Id: number;
  info_Jobnumber: string;
  info_Name: string;
  pk_DistMgr: number;
}
//#endregion

//#region Get
export interface GetRequest {
  fk_Zone_Id: number;
  fk_Info_Id: number;
}

export interface GetResponses {
  pk_DistMgr: number;
  zone_Id: number;
  zone_Name: string;
  info_Id: number;
  info_Jobnumber: string;
  info_Name: string;
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  pk_DistMgr: number;
}

export interface GetDetailResponses {
  fk_Zone_Id: number;
  fk_Info_Id: number;
  pk_DistMgr: number;
  distMgr_CreateId: number;
  distMgr_CreateCode: string;
  distMgr_CreateDate: number;
  distMgr_CreateIp: string;
  distMgr_EditId: number;
  distMgr_EditCode: string;
  distMgr_EditDate: number;
  distMgr_EditIp: string;
}
//#endregion

//#region Delete
export interface DeleteRequest {
  pk_DistMgr: number;
  info_Jobnumber: string;
  info_Name: string;
}
//#endregion

