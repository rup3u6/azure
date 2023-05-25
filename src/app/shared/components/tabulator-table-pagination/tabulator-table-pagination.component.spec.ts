import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabulatorTablePaginationComponent } from './tabulator-table-pagination.component';

describe('TabulatorTablePaginationComponent', () => {
  let component: TabulatorTablePaginationComponent;
  let fixture: ComponentFixture<TabulatorTablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabulatorTablePaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabulatorTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
