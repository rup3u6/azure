import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GAllowlistTableComponent } from './g-allowlist-table.component';

describe('GAllowlistTableComponent', () => {
  let component: GAllowlistTableComponent;
  let fixture: ComponentFixture<GAllowlistTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GAllowlistTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GAllowlistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
