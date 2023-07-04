import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GAllowlistSearchFormComponent } from './g-allowlist-search-form.component';

describe('GAllowlistSearchFormComponent', () => {
  let component: GAllowlistSearchFormComponent;
  let fixture: ComponentFixture<GAllowlistSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GAllowlistSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GAllowlistSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
