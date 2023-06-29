//#region Create
export interface CreateRequest {
  fk_Info_Id: number;
  secretary_Name: string;
  info_Site: string;
  sec_Depts: string;
  sec_Special: string;
}

export interface CreateResponses {
  lCheckUserInfo: [];
  lCheckDept: [];
  lCheckSpecial: [];
  lRepeatDept: [];
  lRepeatSpecial: [];
}
//#endregion

//#region Update
export interface UpdateRequest {
  fk_Info_Id: number;
  secretary_Name: string;
  info_Site: string;
  sec_Depts: string;
  sec_Special: string;
  pk_Secretary: number;
}

export interface UpdateResponses {
  lCheckUserInfo: [];
  lCheckDept: [];
  lCheckSpecial: [];
  lRepeatDept: [];
  lRepeatSpecial: [];
}
//#endregion

//#region Get
export interface GetRequest {
  info_Jobnumber: string;
  info_Name: string;
  sec_Depts: string;
  sec_Special: string;
}

export interface GetResponses {
  pk_Secretary: number;
  fk_Info_Id: number;
  info_Jobnumber: string;
  info_Name: string;
  sec_Depts: string;
  sec_Special: string;
  sec_EditId: number;
  sec_EditCode: string;
  sec_EditDate: number;
  sec_EditIp: string;
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  pk_Secretary: number;
  fk_Info_Id: number;
}

export interface GetDetailResponses {
  pk_Secretary: number;
  fk_Info_Id: number;
  info_Jobnumber: string;
  info_Name: string;
  info_Ename: string;
  info_Site: string;
  sec_Depts: string;
  sec_Special: string;
}
//#endregion

//#region Delete
export interface DeleteRequest {
  pk_Secretary: number;
  secretary_Name: string;
}
//#endregion

