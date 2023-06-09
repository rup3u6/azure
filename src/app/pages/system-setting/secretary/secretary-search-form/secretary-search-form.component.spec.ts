import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretarySearchFormComponent } from './secretary-search-form.component';

describe('SecretarySearchFormComponent', () => {
  let component: SecretarySearchFormComponent;
  let fixture: ComponentFixture<SecretarySearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretarySearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretarySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
