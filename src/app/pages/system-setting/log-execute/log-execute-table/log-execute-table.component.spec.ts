import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogExecuteTableComponent } from './log-execute-table.component';

describe('LogExecuteTableComponent', () => {
  let component: LogExecuteTableComponent;
  let fixture: ComponentFixture<LogExecuteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogExecuteTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogExecuteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
