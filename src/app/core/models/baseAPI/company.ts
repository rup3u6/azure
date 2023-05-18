export interface CInCompanyPageData {
  company_State: boolean;
  company_Name: string;
  company_Code: string;
  company_Sort: number;
}

export interface CInCompanyUpdate {
  company_State: boolean;
  company_Name: string;
  company_Code: string;
  company_Sort: number;
  company_Id: string;
}

export interface CInCompanySearch {
  company_Name: string;
  company_State: boolean;
}

export interface CInCompanyDetail {
  lPk: number;
}

export interface CInCompanyConvertState {
  lPk: number;
  bState: boolean;
}
