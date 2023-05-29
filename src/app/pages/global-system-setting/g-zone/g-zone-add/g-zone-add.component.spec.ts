import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GZoneAddComponent } from './g-zone-add.component';

describe('GZoneAddComponent', () => {
  let component: GZoneAddComponent;
  let fixture: ComponentFixture<GZoneAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GZoneAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GZoneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
