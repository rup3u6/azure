import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GModuleClassTableComponent } from './g-module-class-table.component';

describe('GModuleClassTableComponent', () => {
  let component: GModuleClassTableComponent;
  let fixture: ComponentFixture<GModuleClassTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GModuleClassTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GModuleClassTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
