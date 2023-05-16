import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
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
export class TabulatorTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @ViewChild('tabulatorTable') tableElRef!: ElementRef;

  @Input() initData: Array<any> = [];
  @Input() columnNames: Array<any> = [];
  @Input() i18nName: string = '';

  public table!: Tabulator;
  private columns: Array<any> = [];
  private i18nColumnTitle: { [x: string]: string } = {};

  constructor(private translationService: TranslateService) {
    // 語言切換後取得新的欄位名稱
    translationService.store.onLangChange.subscribe((lang: LangChangeEvent) => {
      translationService.get(this.i18nName).subscribe((res) => {
        this.i18nColumnTitle = res;
        this.seti18nTitle();
        this.table.setColumns(this.columns);
      });
    });
  }
  ngOnInit(): void {
    //  初次建立依據當前語系取得欄位名稱
    this.translationService.get(this.i18nName).subscribe((res) => {
      this.i18nColumnTitle = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.table && changes['tableData']) {
    //   this.table.setData(this.tableData);
    // }
  }

  ngAfterViewInit() {
    this.seti18nTitle();
    this.drawTable();
  }

  private seti18nTitle() {
    this.columns = this.columnNames.map((colCfg) => {
      let newColCfg = Object.assign({}, colCfg);
      const { i18n } = newColCfg;
      if (i18n in this.i18nColumnTitle) {
        newColCfg.title = this.i18nColumnTitle[i18n];
      }
      delete newColCfg.i18n;
      return newColCfg;
    });
  }

  private drawTable(): void {
    this.table = new Tabulator(this.tableElRef.nativeElement, {
      data: this.initData,
      reactiveData: true,
      columns: this.columns,
      layout: 'fitColumns',
      pagination: true,
      paginationSize: 10,
    });
  }
}
