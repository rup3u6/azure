import { TestBed } from '@angular/core/testing';

import { GModuleClassService } from './g-module-class.service';

describe('GModuleClassService', () => {
  let service: GModuleClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GModuleClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
