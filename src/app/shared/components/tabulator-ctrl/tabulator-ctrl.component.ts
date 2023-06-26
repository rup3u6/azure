import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tabulator-ctrl',
  templateUrl: './tabulator-ctrl.component.html',
  styleUrls: ['./tabulator-ctrl.component.scss']
})
export class TabulatorCtrlComponent  {

  html: any;

  type = '';
  data = {};

  constructor(private _elemRef: ElementRef) {
    this.html = this._elemRef.nativeElement;
  }

  edit(event: any) { }

  del(event: any) { }

  copy(event: any) { }

  more(event: any) { }
}

export enum TabulatorCtrlType {
  edit = 'edit',
  delete = 'delete',
  copy = 'copy',
  editCopyDelete = 'editCopyDelete',
}
