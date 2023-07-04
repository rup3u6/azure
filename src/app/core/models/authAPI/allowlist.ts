//#region Create
export interface CreateRequest {
  fk_Zone_Id: number;
  zone_Name: string;
  fk_Info_Jobnumber: string[];
}
//#endregion

//#region Delete
export interface DeleteRequest {
  fk_Zone_Id: number;
  zone_Name: string;
  fk_Info_Jobnumber: string[];
}
//#endregion

//#region Get
export interface GetRequest {
  zone_Id: number;
  info_Jobnumber: string;
}

export interface GetResponses {
  fk_Zone_Id: number;
  zone_Name: string;
  fk_Info_Jobnumber: string;
  info_Name: string;
  info_Ename: string;
  info_State: string;
}
//#endregion
