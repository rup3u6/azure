import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneTableComponent } from './zone-table.component';

describe('ZoneTableComponent', () => {
  let component: ZoneTableComponent;
  let fixture: ComponentFixture<ZoneTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
