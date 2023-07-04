import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GAllowlistAddComponent } from './g-allowlist-add.component';

describe('GAllowlistAddComponent', () => {
  let component: GAllowlistAddComponent;
  let fixture: ComponentFixture<GAllowlistAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GAllowlistAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GAllowlistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
