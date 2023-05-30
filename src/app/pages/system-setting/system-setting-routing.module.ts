import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { LocationComponent } from './location/location.component';
import { LogExecuteComponent } from './log-execute/log-execute.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingRoutingModule {}
