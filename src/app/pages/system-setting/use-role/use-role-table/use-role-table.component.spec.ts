import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseRoleTableComponent } from './use-role-table.component';

describe('UseRoleTableComponent', () => {
  let component: UseRoleTableComponent;
  let fixture: ComponentFixture<UseRoleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseRoleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseRoleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
