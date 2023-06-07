import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseRoleSearchFormComponent } from './use-role-search-form.component';

describe('UseRoleSearchFormComponent', () => {
  let component: UseRoleSearchFormComponent;
  let fixture: ComponentFixture<UseRoleSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseRoleSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseRoleSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
