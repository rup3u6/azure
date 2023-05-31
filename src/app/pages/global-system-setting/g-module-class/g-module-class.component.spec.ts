import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GModuleClassComponent } from './g-module-class.component';

describe('GModuleClassComponent', () => {
  let component: GModuleClassComponent;
  let fixture: ComponentFixture<GModuleClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GModuleClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GModuleClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
