import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogExecuteSearchFormComponent } from './log-execute-search-form.component';

describe('LogExecuteSearchFormComponent', () => {
  let component: LogExecuteSearchFormComponent;
  let fixture: ComponentFixture<LogExecuteSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogExecuteSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogExecuteSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
