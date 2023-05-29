import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GZoneComponent } from './g-zone.component';

describe('GZoneComponent', () => {
  let component: GZoneComponent;
  let fixture: ComponentFixture<GZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
