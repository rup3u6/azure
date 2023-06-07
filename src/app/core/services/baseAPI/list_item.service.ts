import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// models
import * as base from '../../models/baseAPI/base';
import * as listItem from '../../models/baseAPI/list_item';

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(body1: string, sParentCode = '') {
    const a = body1.split(',');

    let body: listItem.Request[] = [
      {
        sListItemType: a[0],
        sTypeCode: a[1],
        sStyleCode: a[2],
        sParentCode
      }
    ];

    return this.http.post<base.ResponsesBase<listItem.ListItemResponsesBase<any[]>>>(`${this.apiUrl}/Base/ListItem`, body);
  }
}
