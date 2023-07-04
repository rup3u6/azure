//#region Common
export enum Common {
  顯示使用者姓名 = 'Common,UseInfo,Name',
  顯示使用者ID = 'Common,UseInfo,Account',
  顯示使用者ID_姓名 = 'Common,UseInfo,AccountName',
  顯示Site = 'Common,UseInfo,Site',
  顯示工號_中名_英名_Site = 'Common,UseInfo,SecretaryName',
  顯示Location = 'Common,UseInfo,Site_LocationId',
  顯示角色名稱 = 'Common,UseRole,RoleName',
  顯示Location名稱 = 'Common,WfLocation,LocationName',
  顯示Location英文名稱 = 'Common,WfLocation,LocationEName',
  與Site關聯_顯示Location名稱 = 'Common,WfLocation,Site_LocationName',
  當前依使用者Zone_取得Location分區 = 'Common,WfLocation,LocationArea',
  與Site關聯_顯示LocationCode_Location名稱 = 'Common,WfLocation,Site_LocationIdName',
  依據_使用者_的Zone_顯示Site = 'Common,Wf_Zone_Site,Site',
  針對還沒使用過的Site_顯示Site = 'Common,Wf_Zone_Site,EnableSite',
  針對已經使用過的Site_顯示Site = 'Common,Wf_Zone_Site,DisenableSite',
  顯示區域名稱 = 'Common,Wf_Zone,Name',
}
//#endregion

//#region sysCode
export enum SysCode {
  停用狀態 = 'SysCode,FormState,',
  是否 = 'SysCode,YesOrNo,',
}

export enum SysCodeStyleCode {
  顯示代碼名稱 = 'Name',
  顯示代碼代號_代碼名稱 = 'CodeName',
  顯示代碼名稱_不篩選停用狀態 = 'NameAllState',
  顯示代碼代號_代碼名稱_不篩選停用狀態 = 'CodeNameAllState',
}
//#endregion
