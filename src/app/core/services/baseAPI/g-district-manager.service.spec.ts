import { TestBed } from '@angular/core/testing';

import { GDistrictManagerService } from './g-district-manager.service';

describe('GDistrictManagerService', () => {
  let service: GDistrictManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GDistrictManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
