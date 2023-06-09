import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryTableComponent } from './secretary-table.component';

describe('SecretaryTableComponent', () => {
  let component: SecretaryTableComponent;
  let fixture: ComponentFixture<SecretaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretaryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
