import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-repeat-confirm',
  templateUrl: './repeat-confirm.component.html',
  styleUrls: ['./repeat-confirm.component.scss']
})
export class RepeatConfirmComponent {
  @Output() close = new EventEmitter<any>();
}
