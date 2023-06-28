import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NMailAddComponent } from './n-mail-add.component';

describe('NMailAddComponent', () => {
  let component: NMailAddComponent;
  let fixture: ComponentFixture<NMailAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NMailAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NMailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
