import { TestBed } from '@angular/core/testing';

import { GModuleService } from './g-module.service';

describe('GModuleService', () => {
  let service: GModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
