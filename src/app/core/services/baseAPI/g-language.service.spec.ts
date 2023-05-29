import { TestBed } from '@angular/core/testing';

import { GLanguageService } from './g-language.service';

describe('GLanguageService', () => {
  let service: GLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GLanguageService);
  });

  it('should be created', () => {``
    expect(service).toBeTruthy();
  });
});
