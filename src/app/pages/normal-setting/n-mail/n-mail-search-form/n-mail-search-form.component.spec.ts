import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NMailSearchFormComponent } from './n-mail-search-form.component';

describe('NMailSearchFormComponent', () => {
  let component: NMailSearchFormComponent;
  let fixture: ComponentFixture<NMailSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NMailSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NMailSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
