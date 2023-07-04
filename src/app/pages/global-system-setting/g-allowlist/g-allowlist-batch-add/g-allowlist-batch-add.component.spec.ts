import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GAllowlistBatchAddComponent } from './g-allowlist-batch-add.component';

describe('GAllowlistBatchAddComponent', () => {
  let component: GAllowlistBatchAddComponent;
  let fixture: ComponentFixture<GAllowlistBatchAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GAllowlistBatchAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GAllowlistBatchAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
