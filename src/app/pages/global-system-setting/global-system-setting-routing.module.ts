import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { GLanguageComponent } from './g-language/g-language.component';
import { GZoneComponent } from './g-zone/g-zone.component';
import { GModuleClassComponent } from './g-module-class/g-module-class.component';
import { GModuleComponent } from './g-modul/g-module.component';
import { GAllowlistComponent } from './g-allowlist/g-allowlist.component';
import { GDistrictManagerComponent } from './g-district-manager/g-district-manager.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full',
  },
  {
    path: 'language',
    component: GLanguageComponent,
  },
  {
    path: 'zone',
    component: GZoneComponent,
  },
  {
    path: 'module-class',
    component: GModuleClassComponent,
  },
  {
    path: 'module',
    component: GModuleComponent,
  },
  {
    path: 'allowlist',
    component: GAllowlistComponent,
  },
  {
    path: 'district-manager',
    component: GDistrictManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalSystemSettingRoutingModule { }
