import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuControlService {
  public sideMenu$: BehaviorSubject<Array<any>> = new BehaviorSubject<
    Array<any>
  >([]);

  private globalSysSettingMenu = [
    {
      mod_Name: '全域管理者維護',
      children: [
        {
          mod_Name: '語系設定',
          mod_Route: '/globalsetting/language',
        },
        {
          mod_Name: '區域維護',
          mod_Route: '/globalsetting/zone',
        },
        {
          mod_Name: '區域管理者帳號維護',
          mod_Route: '',
        },
        // {
        //   mod_Name: '選單分類',
        //   mod_Route: '/globalsetting/module-class',
        // },
        // {
        //   mod_Name: '選單作業',
        //   mod_Route: '/globalsetting/module',
        // },
      ],
    },
  ];
  private sysSettingMenu = [
    {
      mod_Name: '管理者維護',
      children: [
        {
          mod_Name: '角色維護',
          mod_Route: '/systemsetting/use-role',
        },
        {
          mod_Name: '使用者資料查詢',
          mod_Route: '/systemsetting/use-info',
        },
        {
          mod_Name: '秘書管理',
          mod_Route: '/systemsetting/secretary',
        },
        {
          mod_Name: 'Location維護',
          mod_Route: '/systemsetting/location',
        },
        {
          mod_Name: '操作歷程檢視',
          mod_Route: '/systemsetting/log-execute',
        },
        {
          mod_Name: '信用卡卡號格式',
          mod_Route: '',
        },
      ],
    },
  ];
  private normalSetting = [
    {
      mod_Name: '全站',
      children: [
        {
          mod_Name: '首頁Banner維護',
          mod_Route: '',
          children: [],
        },
      ],
    },
    {
      mod_Name: '活動',
      children: [
        {
          mod_Name: '活動維護',
          mod_Route: '',
          children: [],
        },
        {
          mod_Name: '報名維護',
          mod_Route: '',
          children: [],
        },
      ],
    },
    {
      mod_Name: '福利',
      children: [
        {
          mod_Name: '福利金',
          mod_Route: '',
          children: [],
        },
        {
          mod_Name: '規章',
          mod_Route: '',
          children: [],
        },
        {
          mod_Name: '特約商店',
          mod_Route: '',
          children: [],
        },
        {
          mod_Name: '社團天地',
          mod_Route: '',
          children: [],
        },
        {
          mod_Name: '申請維護',
          mod_Route: '',
          children: [],
        },
      ],
    },
    {
      mod_Name: '訂單',
      children: [
        {
          mod_Name: '查詢 / 取消',
          mod_Route: '',
          children: [],
        },
      ],
    },
    {
      mod_Name: '秘書',
      children: [
        {
          mod_Name: '秘書名單',
          mod_Route: '',
          children: [],
        },
        {
          mod_Name: '物資統計｜發放',
          mod_Route: '',
          children: [],
        },
      ],
    },
    {
      mod_Name: '報到',
      children: [
        {
          mod_Name: '活動報到',
          mod_Route: '',
          children: [],
        },
      ],
    },
    {
      mod_Name: '報表',
      children: [
        {
          mod_Name: '活動報表',
          mod_Route: '',
          children: [],
        },
        {
          mod_Name: '福利報表',
          mod_Route: '',
          children: [],
        },
        {
          mod_Name: '報到報表',
          mod_Route: '',
          children: [],
        },
      ],
    },
  ];

  constructor(private router: Router) { }

  setSideMenu(menuType: string, turnPage: boolean = false) {
    switch (menuType) {
      case 'globalSetting':
        this.sideMenu$.next(this.globalSysSettingMenu);
        break;
      case 'systemSetting':
        this.sideMenu$.next(this.sysSettingMenu);
        break;
      case 'normalSetting':
        this.sideMenu$.next(this.normalSetting);
        return;
    }
    if (turnPage) {
      let url;

      for (let menuGroup of this.sideMenu$.value) {
        for (let menuItem of menuGroup.children) {
          if (menuItem.mod_Route) {
            url = menuItem.mod_Route;
            break;
          }
        }
      }
      url && this.router.navigate([url]);
    }
  }

  // 根據菜單主鍵id獲取下級菜單
  // id：菜單主鍵id
  // arry：菜單陣列信息
  private getParentArry(id: any, arry: any, { _pid = "pid" } = {}) {
    return arry.reduce((newArry: any, menuItem: any) => {
      return menuItem[_pid] == id ? [...newArry, menuItem] : newArry;
    }, []);
  }

  // 以下function無關menu建立
  // 製作階層物件
  // id：菜單主鍵id
  createDataLevelObj(id: any, arry: any, { _id = "id", _pid = "pid", _child = "child" } = {}) {
    let childArry = this.getParentArry(id, arry, { _pid });

    return childArry.map((item: any) => {
      return {
        ...item,
        [_child]: this.createDataLevelObj(item[_id], arry, { _id, _pid, _child, }),
      };
    });
  }
}
