import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GLanguageAddComponent } from './g-language-add.component';

describe('GLanguageAddComponent', () => {
  let component: GLanguageAddComponent;
  let fixture: ComponentFixture<GLanguageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GLanguageAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GLanguageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
