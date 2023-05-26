import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GLanguageComponent } from './g-language/g-language.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalSystemSettingRoutingModule { }
