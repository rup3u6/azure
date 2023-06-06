import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseInfoAddComponent } from './use-info-add.component';

describe('UseInfoAddComponent', () => {
  let component: UseInfoAddComponent;
  let fixture: ComponentFixture<UseInfoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseInfoAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseInfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
