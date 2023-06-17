//#region Create
export interface CreateRequest {
  oCIn_UseRole_PageData: CreateOCIn_UseRole_PageData;
  lCIn_UseRoleMember_PageData: CreateLCIn_UseRoleMember_PageData[];
  lCIn_UseRoleAuth_PageData: CreateLCIn_UseRoleAuth_PageData[];
}

export interface CreateOCIn_UseRole_PageData {
  role_State: string;
  role_Name: string;
  role_StartDate: number;
  role_EndDate: number;

}

export interface CreateLCIn_UseRoleMember_PageData {
  cfk_Info_Id: number;
}

export interface CreateLCIn_UseRoleAuth_PageData {
  cfk_Mod_Id: number;
}

export interface CreateResponses {
  oCTab_UseRole: CreateOCTab_UseRole;
  lCTab_UseRoleMember: CreateLCTab_UseRoleMember[];
  lCTab_UseRoleAuth: CreateLCTab_UseRoleAuth[];
}

export interface CreateOCTab_UseRole {
  fk_Zone_Id: number;
  role_Id: number;
  role_State: string;
  role_Name: string;
  role_StartDate: number;
  role_EndDate: number;
  role_EditCode: string;
  role_EditId: number;
  role_EditDate: number;
  role_EditIp: string;
}

export interface CreateLCTab_UseRoleMember {
  cfk_Role_Id: number;
  cfk_Info_Id: number;
}

export interface CreateLCTab_UseRoleAuth {
  cfk_Role_Id: number;
  cfk_Mod_Id: number;

}
//#endregion

//#region Update
export interface UpdateRequest {
  oCIn_UseRole_Update_PageData: UpdateOCIn_UseRole_Update_PageData;
  lCIn_UseRoleMember_Update: UpdateLCIn_UseRoleMember_Update[];
  lCIn_UseRoleAuth_Update: UpdateLCIn_UseRoleAuth_Update[];
}

export interface UpdateOCIn_UseRole_Update_PageData {
  role_Id: number;
  role_State: string;
  role_Name: string;
  role_StartDate: number;
  role_EndDate: number;
}

export interface UpdateLCIn_UseRoleMember_Update {
  cfk_Role_Id: number;
  cfk_Info_Id: number;
}

export interface UpdateLCIn_UseRoleAuth_Update {
  cfk_Role_Id: number;
  cfk_Mod_Id: number;
}

export interface UpdateResponses {
  oCTab_UseRole: UpdateROCTab_UseRole;
  lCTab_UseRoleMember: UpdateRLCTab_UseRoleMember[];
  lCTab_UseRoleAuth: UpdateRLCTab_UseRoleAuth[];
}

export interface UpdateROCTab_UseRole {
  role_Id: number;
  role_State: number;
  role_Name: string;
  role_StartDate: number;
  role_EndDate: number;
  role_EditCode: string;
  role_EditId: number;
  role_EditDate: number;
  role_EditIp: string;
}

export interface UpdateRLCTab_UseRoleMember {
  cfk_Role_Id: number;
  cfk_Info_Id: number;
}

export interface UpdateRLCTab_UseRoleAuth {
  cfk_Role_Id: number;
  cfk_Mod_Id: number;
}
//#endregion

//#region Get
export interface GetRequest {
  role_State: string;
  role_Name: string;
}

export interface GetResponses {
  fk_Zone_Id: number;
  role_Id: number;
  role_State: string;
  role_Name: string;
  role_StartDate: number;
  role_EndDate: number;
  role_EditId: number;
  info_Jobnumber: string;
  role_EditCode: string;
  role_EditDate: number;
  role_EditIp: string;
}
//#endregion

//#region GetDetail
export interface GetDetailRequest {
  role_Id: number;
}

export interface GetDetailResponses {
  oCTab_UseRole: GetDetailOCTab_UseRole;
  lCTab_UseRoleMember: GetDetailLCTab_UseRoleMember[];
  lCTab_UseRoleAuth: GetDetailLCTab_UseRoleAuth[];
}

export interface GetDetailOCTab_UseRole {
  fk_Zone_Id: number;
  role_Id: number;
  role_State: string;
  role_Name: string;
  role_StartDate: number;
  role_EndDate: number;
  role_EditCode: string;
  role_EditId: number;
  role_EditDate: number;
  role_EditIp: string;
}

export interface GetDetailLCTab_UseRoleMember {
  cfk_Role_Id: number;
  cfk_Info_Id: number;
}

export interface GetDetailLCTab_UseRoleAuth {
  cfk_Role_Id: number;
  cfk_Mod_Id: number;
}
//#endregion

//#region ConvertState
export interface ConvertStateRequest {
  lCIn_ConvertState_PageData: ConvertStateLCIn_ConvertState_PageData[];
  sState: string;
}

export interface ConvertStateLCIn_ConvertState_PageData {
  lPk: number;
  sName: string;
}
//#endregion

export interface GetModulesRequest {
  lZoneId: number;
}

export interface GetModulesResponses {
  module_Pk: string;
  module_Name: string;
  module_Parent: string;
  module_order: string;

  checked: boolean;
}
//#endregion

