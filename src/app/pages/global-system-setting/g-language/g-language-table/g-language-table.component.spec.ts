import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GLanguageTableComponent } from './g-language-table.component';

describe('GLanguageTableComponent', () => {
  let component: GLanguageTableComponent;
  let fixture: ComponentFixture<GLanguageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GLanguageTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GLanguageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
