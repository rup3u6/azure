import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatConfirmComponent } from './repeat-confirm.component';

describe('RepeatConfirmComponent', () => {
  let component: RepeatConfirmComponent;
  let fixture: ComponentFixture<RepeatConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeatConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
