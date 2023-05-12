import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: "full", // 當路徑是空的時候轉址到 home
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'home',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((mod) => mod.HomeModule),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
