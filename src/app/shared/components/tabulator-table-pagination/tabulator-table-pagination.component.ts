import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tabulator } from 'tabulator-tables';

@Component({
  selector: 'div[app-tabulator-table-pagination]',
  templateUrl: './tabulator-table-pagination.component.html',
  styleUrls: ['./tabulator-table-pagination.component.scss'],
})
export class TabulatorTablePaginationComponent implements OnInit {
  @Input() initData: Array<any> = [];
  @Input() columnNames: Array<any> = [];
  @Input() tableConfig = {};
  @Output() tableBuilded = new EventEmitter<any>();

  tableReady = false;
  tabulatorTable!: Tabulator;
  _tableConfig = { pagination: true, paginationSize: 10 };

  ngOnInit(): void {
    Object.assign(this._tableConfig, this.tableConfig);
  }

  _tableBuilded(table: Tabulator) {
    this.tabulatorTable = table;
    this.tableBuilded.emit(table);
    setTimeout(() => {
      this.tableReady = true;
    }, 0);
  }

  previousPage() {
    const currentPage = this.tabulatorTable.getPage();
    currentPage !== 1 && this.tabulatorTable.previousPage();
  }
  nextPage() {
    const currentPage = this.tabulatorTable.getPage();
    const maximumPage = this.tabulatorTable.getPageMax();
    currentPage !== maximumPage && this.tabulatorTable.nextPage();
  }
  setCurrentPage(event: any) {
    this.tabulatorTable.setPage(event.target.value);
  }
}
