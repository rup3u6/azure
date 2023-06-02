//#region Get
export interface GetRequest {
  logExec_ChangeItem: string;
  logExec_Action: string;
  startSearchDate: string;
  endSearchDate: number;
  info_Jobnumber: string;
  info_Name: string;
  info_Ename: string;
}

export interface GetResponses {
  logExec_Id: number;
  logExec_Module: string;
  logExec_Action: string;
  logExec_ChangeItem: string;
  info_Jobnumber: string;
  logExec_CreateCode: string;
  logExec_CreateId: number;
  logExec_CreateDate: number;
  logExec_CreateIp: string;
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  logExec_Id: number;
}

export interface GetDetailResponses {
  logExec_Id: number;
  logExec_Action: string;
  logExec_ChangeItem: string;
  info_Jobnumber: string;
  logExec_CreateCode: string;
  logExec_CreateId: number;
  logExec_CreateDate: number;
  logExec_CreateIp: string;
}
//#endregion
