import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabulator-cell',
  templateUrl: './tabulator-cell.component.html',
  styleUrls: ['./tabulator-cell.component.scss']
})
export class TabulatorCellComponent {

  @ViewChild('tabulatorCellInner') cellInnerElRef: any;
  @ViewChild('tabulatorCellInnerNowrap') cellInnerNowrapElRef: any;

  html: any;

  type = TabulatorCellType.text;
  data: string[] = [];

  constructor(private _elemRef: ElementRef) {
    this.html = this._elemRef.nativeElement;
  }

  ngAfterViewInit() {
    this.onResize();
  }

  onResize() {
    if (this._elemRef && this.cellInnerElRef && this.cellInnerNowrapElRef) {
      const elemRefW = this._elemRef.nativeElement.clientWidth;
      const cellInnerNowrapElRef = this.cellInnerNowrapElRef.nativeElement.clientWidth;

      console.log('-----');
      console.log(elemRefW);
      console.log(cellInnerNowrapElRef);

      // 欄位內容不換行 + 20 < 欄位大小
      if (cellInnerNowrapElRef + 20 < elemRefW) {
        this.cellInnerElRef.nativeElement.classList.remove('wrap');
      } else {
        this.cellInnerElRef.nativeElement.classList.add('wrap');
      }
    }
  }

  onClick(event: any) { }
}

export enum TabulatorCellType {
  text = 'text',
  link = 'link',
}
