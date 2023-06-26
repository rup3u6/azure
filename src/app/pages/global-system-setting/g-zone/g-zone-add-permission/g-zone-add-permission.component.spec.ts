import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GZoneAddPermissionComponent } from './g-zone-add-permission.component';

describe('GZoneAddPermissionComponent', () => {
  let component: GZoneAddPermissionComponent;
  let fixture: ComponentFixture<GZoneAddPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GZoneAddPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GZoneAddPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
