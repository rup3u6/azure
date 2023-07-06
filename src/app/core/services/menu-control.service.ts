import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuControlService {

  isShow = true;
  sideMenu$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  private globalSysSettingMenu = [
    {
      module_Name: 'MENUS.GLOBAL_MANAGER',  //  全域管理者設定
      child: [
        {
          module_Name: 'MENUS.GLOBAL_LANGUAGE', //  語系設定
          mod_Route: '/globalsetting/language',
        },
        {
          module_Name: 'MENUS.GLOBAL_ZONE', //  區域維護
          mod_Route: '/globalsetting/zone',
        },
        {
          module_Name: '白名單維護',
          mod_Route: '/globalsetting/allowlist',
        },
        {
          module_Name: '跨區管理者名單維護',
          mod_Route: '/globalsetting/district-manager',
        },
        // {
        //   module_Name: '選單分類',
        //   mod_Route: '/globalsetting/module-class',
        // },
        // {
        //   module_Name: '選單作業',
        //   mod_Route: '/globalsetting/module',
        // },
      ],
    },
  ];
  private sysSettingMenu = [
    {
      module_Name: 'MENUS.ZONE_MANAGER',  //  管理者維護
      child: [
        {
          module_Name: 'MENUS.ROLE_MANAGEMENT', //  角色維護
          mod_Route: '/systemsetting/use-role',
        },
        {
          module_Name: 'MENUS.USER_MANAGEMENT',  //  使用者資料查詢
          mod_Route: '/systemsetting/use-info',
        },
        {
          module_Name: '秘書管理',
          mod_Route: '/systemsetting/secretary',
        },
        {
          module_Name: 'Location維護',
          mod_Route: '/systemsetting/location',
        },
        {
          module_Name: '操作歷程檢視',
          mod_Route: '/systemsetting/log-execute',
        },
        // {
        //   module_Name: '聯絡我們維護',
        //   mod_Route: '',
        // },
        {
          module_Name: '服務活動名單維護',
          mod_Route: '/systemsetting/service-activity',
        },
      ],
    },
  ];
  private normalSetting = [];
  // [
  //   {
  //     module_Name: '全站',
  //     child: [
  //       {
  //         module_Name: '首頁Banner維護',
  //         mod_Route: '',
  //         child: [],
  //       },
  //     ],
  //   },
  //   {
  //     module_Name: '活動',
  //     child: [
  //       {
  //         module_Name: '活動維護',
  //         mod_Route: '',
  //         child: [],
  //       },
  //       {
  //         module_Name: '報名維護',
  //         mod_Route: '',
  //         child: [],
  //       },
  //     ],
  //   },
  //   {
  //     module_Name: '福利',
  //     child: [
  //       {
  //         module_Name: '福利金',
  //         mod_Route: '',
  //         child: [],
  //       },
  //       {
  //         module_Name: '規章',
  //         mod_Route: '',
  //         child: [],
  //       },
  //       {
  //         module_Name: '特約商店',
  //         mod_Route: '',
  //         child: [],
  //       },
  //       {
  //         module_Name: '社團天地',
  //         mod_Route: '',
  //         child: [],
  //       },
  //       {
  //         module_Name: '申請維護',
  //         mod_Route: '',
  //         child: [],
  //       },
  //     ],
  //   },
  //   {
  //     module_Name: '訂單',
  //     child: [
  //       {
  //         module_Name: '查詢 / 取消',
  //         mod_Route: '',
  //         child: [],
  //       },
  //     ],
  //   },
  //   {
  //     module_Name: '秘書',
  //     child: [
  //       {
  //         module_Name: '秘書名單',
  //         mod_Route: '',
  //         child: [],
  //       },
  //       {
  //         module_Name: '物資統計｜發放',
  //         mod_Route: '',
  //         child: [],
  //       },
  //     ],
  //   },
  //   {
  //     module_Name: '報到',
  //     child: [
  //       {
  //         module_Name: '活動報到',
  //         mod_Route: '',
  //         child: [],
  //       },
  //     ],
  //   },
  //   {
  //     module_Name: '報表',
  //     child: [
  //       {
  //         module_Name: '活動報表',
  //         mod_Route: '',
  //         child: [],
  //       },
  //       {
  //         module_Name: '福利報表',
  //         mod_Route: '',
  //         child: [],
  //       },
  //       {
  //         module_Name: '報到報表',
  //         mod_Route: '',
  //         child: [],
  //       },
  //     ],
  //   },
  // ];

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
        for (let menuItem of menuGroup.child) {
          if (menuItem.mod_Route) {
            url = menuItem.mod_Route;
            break;
          }
        }
      }
      url && this.router.navigate([url]);
    }
  }

  setNormalSettingMenu(menu: any) {
    this.normalSetting = menu ?? [];
  }

  // 根據菜單主鍵id獲取下級菜單
  // id：菜單主鍵id
  // arry：菜單陣列信息
  private getParentArry(id: any, arry: any, { _pid = 'pid' } = {}) {
    return arry.reduce((newArry: any, menuItem: any) => {
      return menuItem[_pid] == id ? [...newArry, menuItem] : newArry;
    }, []);
  }

  // 以下function無關menu建立
  // 製作階層物件
  // id：菜單主鍵id
  createDataLevelObj(
    id: any,
    arry: any,
    { _id = "module_Pk", _pid = "module_Parent", _child = "child" } = {}
  ) {
    let childArry = this.getParentArry(id, arry, { _pid });

    return childArry.map((item: any) => {
      return {
        ...item,
        [_child]: this.createDataLevelObj(item[_id], arry, {
          _id,
          _pid,
          _child,
        }),
      };
    });
  }
}
