import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NMailTableComponent } from './n-mail-table.component';

describe('NMailTableComponent', () => {
  let component: NMailTableComponent;
  let fixture: ComponentFixture<NMailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NMailTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NMailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
