import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneSearchFormComponent } from './zone-search-form.component';

describe('ZoneSearchFormComponent', () => {
  let component: ZoneSearchFormComponent;
  let fixture: ComponentFixture<ZoneSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
