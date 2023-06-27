import { Component } from '@angular/core';

// services
import { MenuControlService } from 'src/app/core/services/menu-control.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {

  constructor(public menuControlService: MenuControlService) { }

}
