import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseRoleComponent } from './use-role.component';

describe('UseRoleComponent', () => {
  let component: UseRoleComponent;
  let fixture: ComponentFixture<UseRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
