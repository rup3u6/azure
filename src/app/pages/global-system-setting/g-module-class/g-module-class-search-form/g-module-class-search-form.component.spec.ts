import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GModuleClassSearchFormComponent } from './g-module-class-search-form.component';

describe('GModuleClassSearchFormComponent', () => {
  let component: GModuleClassSearchFormComponent;
  let fixture: ComponentFixture<GModuleClassSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GModuleClassSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GModuleClassSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
