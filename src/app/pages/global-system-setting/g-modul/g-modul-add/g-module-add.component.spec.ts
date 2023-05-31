import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GModuleAddComponent } from './g-module-add.component';

describe('GModuleAddComponent', () => {
  let component: GModuleAddComponent;
  let fixture: ComponentFixture<GModuleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GModuleAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GModuleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
