import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// models
import * as base from '../../models/baseAPI/base';
import * as listItem from '../../models/baseAPI/list_item';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  search(listItemStrList: string[], sParentCode = '') {
    let body: listItem.Request[] = listItemStrList.map(item => {
      const arr = item.split(',');

      return {
        sListItemType: arr[0],
        sTypeCode: arr[1],
        sStyleCode: arr[2],
        sParentCode,
      }
    });

    return this.http.post<base.ResponsesBase<listItem.ListItemResponsesBase<any[]>[]>>(`${this.apiUrl}/Base/ListItem`,
      body
    )
    .pipe(map((res: any) => JSON.parse(res)));
  }
}
