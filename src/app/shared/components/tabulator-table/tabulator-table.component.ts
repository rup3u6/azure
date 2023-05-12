import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

@Component({
  selector: 'app-tabulator-table',
  templateUrl: './tabulator-table.component.html',
  styleUrls: ['./tabulator-table.component.scss'],
})
export class TabulatorTableComponent implements AfterViewInit, OnChanges {
  @ViewChild('tabulatorTable') tableElRef!: ElementRef;

  @Input() tableData: Array<any> = [];
  @Input() columnNames: Array<any> = [];

  public table!: Tabulator;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.table && changes['tableData']) {
      this.table.setData(this.tableData);
    }
  }

  ngAfterViewInit() {
    this.drawTable();
  }
  private drawTable(): void {
    this.table = new Tabulator(this.tableElRef.nativeElement, {
      data: this.tableData,
      reactiveData: true, //enable data reactivity
      columns: this.columnNames,
      layout: 'fitData',
      pagination: true,
      paginationSize:2,
    });
  }
}
