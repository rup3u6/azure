import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss'],
})
export class DeleteConfirmComponent {

  @Input() mode ='disable';

  @Output() close = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();
}
