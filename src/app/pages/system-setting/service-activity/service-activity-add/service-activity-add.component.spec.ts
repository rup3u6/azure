import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceActivityAddComponent } from './service-activity-add.component';

describe('ServiceActivityAddComponent', () => {
  let component: ServiceActivityAddComponent;
  let fixture: ComponentFixture<ServiceActivityAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceActivityAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceActivityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
