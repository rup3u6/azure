import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GModuleTableComponent } from './g-module-table.component';

describe('GModuleTableComponent', () => {
  let component: GModuleTableComponent;
  let fixture: ComponentFixture<GModuleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GModuleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GModuleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
