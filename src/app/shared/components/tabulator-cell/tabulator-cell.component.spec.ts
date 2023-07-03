import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabulatorCellComponent } from './tabulator-cell.component';

describe('TabulatorCellComponent', () => {
  let component: TabulatorCellComponent;
  let fixture: ComponentFixture<TabulatorCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabulatorCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabulatorCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
