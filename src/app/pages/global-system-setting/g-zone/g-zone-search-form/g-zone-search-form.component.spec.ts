import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GZoneSearchFormComponent } from './g-zone-search-form.component';

describe('GZoneSearchFormComponent', () => {
  let component: GZoneSearchFormComponent;
  let fixture: ComponentFixture<GZoneSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GZoneSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GZoneSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
