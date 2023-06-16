import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { ManagerInfoService } from '../services/authAPI/manager-info.service';
import { LoadingService } from '../services/loading.service';
import { Message } from '../enum/message';
import { MessageService } from '../services/message.service';
import { MenuControlService } from '../services/menu-control.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private managerInfoService: ManagerInfoService,
    private messageService: MessageService,
    private menuControlService: MenuControlService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let token = sessionStorage.getItem('wis_cms_token');
    if (token) {
      //判斷是否有工號
      if (!this.managerInfoService.managerJobNumber) {
        try {
          this.loadingService.startLoading();
          await firstValueFrom(this.managerInfoService.getManagerInfo());
        } catch (e) {
          console.log(e);
        } finally {
          this.loadingService.stopLoading();
        }
      }
      //  根據頁面種類辨別
      const urlStart = state.url.split('/')[1];
      switch (urlStart) {
        case 'globalsetting':
          return this.isGlobalManager();
        case 'systemsetting':
          return this.isBackendManager();
        default:
          //  todo管理員選單篩選
          return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  isGlobalManager() {
    const isGlobal = this.managerInfoService.isGlobal === '1';
    if (!isGlobal) {
      this.messageService.showModal(
        Message.warning,
        {
          title: '無此頁面權限',
        },
        () => {
          this.menuControlService.setSideMenu('normalSetting');
          this.router.navigate(['/home']);
        }
      );
    }
    return isGlobal;
  }
  isBackendManager() {
    const isBackend =
      this.managerInfoService.isGlobal === '1' ||
      this.managerInfoService.isBackend === '1';
    if (!isBackend) {
      this.messageService.showModal(
        Message.warning,
        {
          title: '無此頁面權限',
        },
        () => {
          this.menuControlService.setSideMenu('normalSetting');
          this.router.navigate(['/home']);
        }
      );
    }
    return isBackend;
  }
}
