import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { LocationComponent } from './location/location.component';
import { LogExecuteComponent } from './log-execute/log-execute.component';
import { UseInfoComponent } from './use-info/use-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full',
  },
  {
    path: 'location',
    component: LocationComponent,
  },
  {
    path: 'log-execute',
    component: LogExecuteComponent,
  },
  {
    path: 'use-info',
    component: UseInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingRoutingModule {}
