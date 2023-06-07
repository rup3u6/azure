export interface ListItemResponsesBase<T> {
  sListItemType: string;
  sTypeCode: string;
  sStyleCode: string;
  dListItem: T;
}

export interface Request {
  sListItemType: string;
  sTypeCode: string;
  sStyleCode: string;
  sParentCode: string;
}
