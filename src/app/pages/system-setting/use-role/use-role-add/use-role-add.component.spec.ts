import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseRoleAddComponent } from './use-role-add.component';

describe('UseRoleAddComponent', () => {
  let component: UseRoleAddComponent;
  let fixture: ComponentFixture<UseRoleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseRoleAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseRoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
