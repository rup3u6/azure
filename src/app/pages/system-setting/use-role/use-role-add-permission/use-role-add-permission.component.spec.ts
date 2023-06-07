import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseRoleAddPermissionComponent } from './use-role-add-permission.component';

describe('UseRoleAddPermissionComponent', () => {
  let component: UseRoleAddPermissionComponent;
  let fixture: ComponentFixture<UseRoleAddPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseRoleAddPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseRoleAddPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
