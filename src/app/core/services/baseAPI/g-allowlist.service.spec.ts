import { TestBed } from '@angular/core/testing';

import { GAllowlistService } from './g-allowlist.service';

describe('GAllowlistService', () => {
  let service: GAllowlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GAllowlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
