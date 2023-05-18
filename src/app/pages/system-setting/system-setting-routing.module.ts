import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full',
  },
  {
    path: 'company',
    component: CompanyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingRoutingModule {}
