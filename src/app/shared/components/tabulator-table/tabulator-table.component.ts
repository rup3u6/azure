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

  constructor(private translationService: TranslateService) {
    // 語言切換後取得新的欄位名稱
    translationService.store.onLangChange.subscribe((lang: LangChangeEvent) => {
      this.seti18nTitle();
      this.table.setColumns(this.columns);
    });
  }
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit() {
    this.seti18nTitle();
    this.drawTable();
  }

  private seti18nTitle() {
    this.columns = this.columnNames.map((colCfg) => {
      let newColCfg = Object.assign({}, colCfg);
      const { title } = newColCfg;
      newColCfg.title = this.translationService.instant(title);
      return newColCfg;
    });
  }

  private drawTable(): void {
    this.table = new Tabulator(this.tableElRef.nativeElement, {
      data: this.initData,
      reactiveData: true,
      columns: this.columns,
      layout: 'fitDataStretch',
      pagination: true,
      paginationSize: 10,
    });
  }
}
