import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseInfoComponent } from './use-info.component';

describe('UseInfoComponent', () => {
  let component: UseInfoComponent;
  let fixture: ComponentFixture<UseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
