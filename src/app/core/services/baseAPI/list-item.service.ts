import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

// service
import { HttpService } from '../../services/http.service';

// models
import * as base from '../../models/base';
import * as listItem from '../../models/baseAPI/list-item';
import { ResponseStatus } from '../../enum/response-status';
import { ListItem } from '../../enum/list-item';
import { LoadingService } from '../loading.service';

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

  private apiUrl = 'Base/ListItem';

  constructor(
    private httpService: HttpService,
    private loadingService: LoadingService,
  ) { }

  search(listItemStrList: string[][]) {
    let body: listItem.Request[] = listItemStrList.map((item: string[]) => {
      const arr = item[0].split(',');

      return {
        sListItemType: arr[0],
        sTypeCode: arr[1],
        sStyleCode: arr[2],
        sParentCode: item[1] ?? '',
      }
    });

    return this.httpService.post<base.ResponsesBase<listItem.ListItemResponsesBase<any[]>[]>>(this.apiUrl, body);
  }

  //#region
  async search1(body: any): Promise<any[]> {
    this.loadingService.startLoading();

    try {
      const listItemRes = await firstValueFrom(this.search(body));

      if (listItemRes.status === ResponseStatus.執行成功) {
        let list = [];
        for (let i in listItemRes.data[0].dListItem) {
          list.push({
            key: i,
            value: listItemRes.data[0].dListItem[i],
          });
        }

        return list;
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingService.stopLoading();
    }

    return [];
  }

  async getSite(): Promise<any[]> {
    return await this.search1([[ListItem.顯示Site]]);
  }

  async getLocation(cfk_Site: string): Promise<any[]> {
    return await this.search1([[ListItem.與Site關聯_顯示Location名稱, cfk_Site]]);
  }

  async getSecretaryName(): Promise<any[]> {
    return await this.search1([[ListItem.顯示工號_中名_英名_Site]]);
  }

  async GetRoleName(): Promise<any[]> {
    return await this.search1([[ListItem.顯示角色名稱]]);
  }
  //#endregion
}
