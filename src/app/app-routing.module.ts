import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DefaultComponent } from './layout/default/default.component';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
