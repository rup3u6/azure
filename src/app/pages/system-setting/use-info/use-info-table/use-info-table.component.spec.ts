import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseInfoTableComponent } from './use-info-table.component';

describe('UseInfoTableComponent', () => {
  let component: UseInfoTableComponent;
  let fixture: ComponentFixture<UseInfoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseInfoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
