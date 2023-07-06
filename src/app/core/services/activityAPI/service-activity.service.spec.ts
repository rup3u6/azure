import { TestBed } from '@angular/core/testing';

import { ServiceActivityService } from './service-activity.service';

describe('ServiceActivityService', () => {
  let service: ServiceActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
