import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GDistrictManagerAddComponent } from './g-district-manager-add.component';

describe('GDistrictManagerAddComponent', () => {
  let component: GDistrictManagerAddComponent;
  let fixture: ComponentFixture<GDistrictManagerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GDistrictManagerAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GDistrictManagerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
