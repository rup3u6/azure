import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tabulator } from 'tabulator-tables';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from '../../models/base';
import * as listItem from '../../models/baseAPI/list-item';

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

  private apiUrl = 'Base/ListItem';

  constructor(private httpService: HttpService) { }

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

    return this.httpService.post<base.ResponsesBase<listItem.ListItemResponsesBase<any[]>[]>>(this.apiUrl, body);
  }
}
