import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GLanguageSearchFormComponent } from './g-language-search-form.component';

describe('GLanguageSearchFormComponent', () => {
  let component: GLanguageSearchFormComponent;
  let fixture: ComponentFixture<GLanguageSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GLanguageSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GLanguageSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
