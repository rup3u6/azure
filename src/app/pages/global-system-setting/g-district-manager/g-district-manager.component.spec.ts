import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GDistrictManagerComponent } from './g-district-manager.component';

describe('GDistrictManagerComponent', () => {
  let component: GDistrictManagerComponent;
  let fixture: ComponentFixture<GDistrictManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GDistrictManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GDistrictManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
