import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { GLanguageComponent } from './g-language/g-language.component';
import { ZoneComponent } from './zone/zone.component';

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
    component: ZoneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalSystemSettingRoutingModule { }
