import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseInfoSearchFormComponent } from './use-info-search-form.component';

describe('UseInfoSearchFormComponent', () => {
  let component: UseInfoSearchFormComponent;
  let fixture: ComponentFixture<UseInfoSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseInfoSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseInfoSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
