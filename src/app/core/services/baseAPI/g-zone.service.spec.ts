import { TestBed } from '@angular/core/testing';

import { GZoneService } from './g-zone.service';

describe('GZoneService', () => {
  let service: GZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
