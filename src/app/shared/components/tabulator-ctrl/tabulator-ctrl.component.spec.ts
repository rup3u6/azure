import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabulatorCtrlComponent } from './tabulator-ctrl.component';

describe('TabulatorCtrlComponent', () => {
  let component: TabulatorCtrlComponent;
  let fixture: ComponentFixture<TabulatorCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabulatorCtrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabulatorCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
