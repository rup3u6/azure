import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NMailComponent } from './n-mail.component';

describe('NMailComponent', () => {
  let component: NMailComponent;
  let fixture: ComponentFixture<NMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
