import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GDistrictManagerTableComponent } from './g-district-manager-table.component';

describe('GDistrictManagerTableComponent', () => {
  let component: GDistrictManagerTableComponent;
  let fixture: ComponentFixture<GDistrictManagerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GDistrictManagerTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GDistrictManagerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
