import { TestBed } from '@angular/core/testing';

import { UseInfoService } from './use-info.service';

describe('UseInfoService', () => {
  let service: UseInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
