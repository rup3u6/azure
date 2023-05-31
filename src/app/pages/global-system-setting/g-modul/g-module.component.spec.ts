import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GModuleComponent } from './g-module.component';

describe('GModuleComponent', () => {
  let component: GModuleComponent;
  let fixture: ComponentFixture<GModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
