import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GLanguageComponent } from './g-language.component';

describe('GLanguageComponent', () => {
  let component: GLanguageComponent;
  let fixture: ComponentFixture<GLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GLanguageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
