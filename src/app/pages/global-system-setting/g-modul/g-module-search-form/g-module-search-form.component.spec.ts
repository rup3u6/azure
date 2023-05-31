import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GModuleSearchFormComponent } from './g-module-search-form.component';

describe('GModuleSearchFormComponent', () => {
  let component: GModuleSearchFormComponent;
  let fixture: ComponentFixture<GModuleSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GModuleSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GModuleSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
