import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { GLanguageComponent } from './g-language/g-language.component';
import { GZoneComponent } from './g-zone/g-zone.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalSystemSettingRoutingModule { }
