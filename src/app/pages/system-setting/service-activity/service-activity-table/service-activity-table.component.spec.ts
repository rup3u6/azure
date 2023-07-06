import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceActivityTableComponent } from './service-activity-table.component';

describe('ServiceActivityTableComponent', () => {
  let component: ServiceActivityTableComponent;
  let fixture: ComponentFixture<ServiceActivityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceActivityTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
