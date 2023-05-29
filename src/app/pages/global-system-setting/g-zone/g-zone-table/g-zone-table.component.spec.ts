import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GZoneTableComponent } from './g-zone-table.component';

describe('GZoneTableComponent', () => {
  let component: GZoneTableComponent;
  let fixture: ComponentFixture<GZoneTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GZoneTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GZoneTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
