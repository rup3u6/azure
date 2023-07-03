import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

@Component({
  selector: 'app-tabulator-table',
  templateUrl: './tabulator-table.component.html',
  styleUrls: ['./tabulator-table.component.scss'],
})
export class TabulatorTableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('tabulatorTable') tableElRef!: ElementRef;

  @Input() initData: Array<any> = [];
  @Input() columnNames: Array<any> = [];
  @Input() tableConfig = {};
  @Output() tableBuilded = new EventEmitter<any>();
  @Output() columnResized = new EventEmitter<any>();

  public table!: Tabulator;
  private columns: Array<any> = [];

  constructor(private translationService: TranslateService) {
    // 語言切換後取得新的欄位名稱
    translationService.store.onLangChange.subscribe((lang: LangChangeEvent) => {
      this.seti18nTitle();
      this.table.setColumns(this.columns);
    });
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void { }

  ngAfterViewInit() {
    this.seti18nTitle();
    this.drawTable();
  }

  private seti18nTitle() {
    this.columns = this.columnNames.map((colCfg) => {
      let newColCfg = Object.assign({}, colCfg);
      const { title } = newColCfg;
      if (title) {
        newColCfg.title = this.translationService.instant(title);
      }
      return newColCfg;
    });
  }

  private drawTable(): void {
    this.table = new Tabulator(this.tableElRef.nativeElement, {
      layout: 'fitColumns',
      data: this.initData,
      columns: this.columns,
      reactiveData: true,
      rowHeight: 35,
      selectable: true,
      ...this.tableConfig,
    });

    this.table.on("columnResized", (data) => {
      this.columnResized.emit();
    });

    this.tableBuilded.emit(this.table);
  }
}
