import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GModuleClassAddComponent } from './g-module-class-add.component';

describe('GModuleClassAddComponent', () => {
  let component: GModuleClassAddComponent;
  let fixture: ComponentFixture<GModuleClassAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GModuleClassAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GModuleClassAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
