import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DefaultComponent } from './layout/default/default.component';
import { BrowserUtils } from '@azure/msal-browser';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', // 當路徑是空的時候轉址到 home
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'home',
    component: DefaultComponent,
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'normalsetting',
    component: DefaultComponent,
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./pages/normal-setting/normal-setting.module').then(
        (mod) => mod.NormalSettingModule
      ),
  },
  {
    path: 'systemsetting',
    component: DefaultComponent,
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./pages/system-setting/system-setting.module').then(
        (mod) => mod.SystemSettingModule
      ),
  },
  {
    path: 'globalsetting',
    component: DefaultComponent,
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./pages/global-system-setting/global-system-setting.module').then(
        (mod) => mod.GlobalSystemSettingModule
      ),
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled', // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
