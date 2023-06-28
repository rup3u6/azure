import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { NMailComponent } from './n-mail/n-mail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full',
  },
  {
    path: 'mail',
    component: NMailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NormalSettingRoutingModule { }
