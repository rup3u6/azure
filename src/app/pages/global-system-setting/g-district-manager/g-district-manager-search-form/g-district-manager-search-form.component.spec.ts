import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GDistrictManagerSearchFormComponent } from './g-district-manager-search-form.component';

describe('GDistrictManagerSearchFormComponent', () => {
  let component: GDistrictManagerSearchFormComponent;
  let fixture: ComponentFixture<GDistrictManagerSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GDistrictManagerSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GDistrictManagerSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
