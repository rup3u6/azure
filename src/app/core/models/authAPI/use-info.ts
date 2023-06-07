//#region Create
export interface CreateRequest {
}

export interface CreateResponses {
}
//#endregion

//#region Update
export interface UpdateRequest {
  info_Id: number;
  info_Global: string;
  info_Backend: string;
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
  info_Jobnumber: string;
  info_Name: string;
  info_Ename: string;
  info_Secretary: string;
  secretary_Name: string;
}

export interface GetResponses {
  info_Id: number;
  info_Jobnumber: string;
  info_Name: string;
  info_Ename: string;
  info_Site: string;
  info_Dept: string;
  info_Secretary: string;
  secretary_Name: string;
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  info_Id: number;
}

export interface GetDetailResponses {
  info_Id: number;
  info_Birthday: number;
  info_Take_Office: number;
  info_Identification: string;
  info_Resign: number;
  info_Sex: string;
  info_Email: string;
  info_Cellphone: string;
  info_Ext: string;
  info_Company: string;
  info_Employee_Type: string;
  info_Expatriate_Date: number;
  info_Dept: string;
  info_Salary_Area: string;
  info_Expatriate_Type: string;
  info_Secretary: string;
  info_Global: string;
  info_Backend: string;
  lCOut_UseRole_PageData: GetDetailResponsesLCOut_UseRole_PageData[];
}

export interface GetDetailResponsesLCOut_UseRole_PageData {
  role_Id: number;
  role_Name: string;
  cfk_Info_Id: number;
}
//#endregion

//#region ConvertState
export interface ConvertStateRequest {
  lPk: number;
  bState: true
}

export interface ConvertStateResponses {
  info_Id: number;
  info_Secretary: string;
  info_Account: string;
  info_Password: string;
  info_Global: string;
  info_Backend: string;
  info_Jobnumber: string;
  info_Name: string;
  info_Ename: string;
  info_Dept: string;
  info_Dept_Name: string;
  info_Company: string;
  info_Email: string;
  info_Salary_Area: string;
  info_Location: string;
  info_WorkPlace: string;
  info_Seat: string;
  info_Birthday: number;
  info_Identification: string;
  info_Cellphone: string;
  info_Take_Office: number;
  info_Resign: number;
  info_Ext: string;
  info_Site: string;
  info_Sex: string;
  info_Supervisor_Id: string;
  info_Company_Name: string;
  info_Expatriate_Date: number;
  info_Employee_Type: string;
  info_Expatriate_Type: string;
  info_RD_Type: string;
  info_Aborigines_Type: string;
  info_Welfare_Type: string;
  info_Dispatch_Type: string;
  info_Foreign_Type: string;
  info_DL_Type: string;
  info_Hour_Type: string;
  info_CreateId: number;
  info_CreateCode: string;
  info_CreateDate: number;
  info_CreateIp: string;
  info_EditId: number;
  info_EditCode: string;
  info_EditDate: number;
  info_EditIp: string;
}
//#endregion

