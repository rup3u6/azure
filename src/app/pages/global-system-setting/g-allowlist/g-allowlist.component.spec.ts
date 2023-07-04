import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GAllowlistComponent } from './g-allowlist.component';

describe('GAllowlistComponent', () => {
  let component: GAllowlistComponent;
  let fixture: ComponentFixture<GAllowlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GAllowlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GAllowlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
