import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogExecuteComponent } from './log-execute.component';

describe('LogExecuteComponent', () => {
  let component: LogExecuteComponent;
  let fixture: ComponentFixture<LogExecuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogExecuteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
