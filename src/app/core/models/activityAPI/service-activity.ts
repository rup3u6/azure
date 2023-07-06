//#region Create
export interface CreateRequest {
  srvAct_Type: string;
  srvAct_Name: string;
  srvAct_State: string;
}

export interface CreateResponses {
}
//#endregion

//#region Update
export interface UpdateRequest {
  pk_SrvAct: number;
  srvAct_Name: string;
  srvAct_State: string;
}

export interface UpdateResponses {
}
//#endregion

//#region Get
export interface GetRequest {
  fk_Zone_Id: number;
  pk_SrvAct: number;
  srvAct_Type: string;
  srvAct_Name: string;
  srvAct_State: string;
  srvAct_CreateId: number;
  srvAct_CreateCode: string;
  srvAct_CreateDate: number;
  srvAct_CreateIp: string;
  srvAct_EditId: number;
  srvAct_EditCode: string;
  srvAct_EditDate: number;
  srvAct_EditIp: string;
}

export interface GetResponses {
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  pk_SrvAct: number;
}

export interface GetDetailResponses {
  fk_Zone_Id: number;
  pk_SrvAct: number;
  srvAct_Type: string;
  srvAct_Name: string;
  srvAct_State: string;
  srvAct_CreateId: number;
  srvAct_CreateCode: string;
  srvAct_CreateDate: number;
  srvAct_CreateIp: string;
  srvAct_EditId: number;
  srvAct_EditCode: string;
  srvAct_EditDate: number;
  srvAct_EditIp: string;
}
//#endregion
