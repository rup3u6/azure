import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogExecuteDetailComponent } from './log-execute-detail.component';

describe('LogExecuteDetailComponent', () => {
  let component: LogExecuteDetailComponent;
  let fixture: ComponentFixture<LogExecuteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogExecuteDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogExecuteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
