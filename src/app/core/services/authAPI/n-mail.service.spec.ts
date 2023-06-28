import { TestBed } from '@angular/core/testing';

import { NMailService } from './n-mail.service';

describe('NMailService', () => {
  let service: NMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
