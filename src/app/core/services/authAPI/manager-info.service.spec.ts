import { TestBed } from '@angular/core/testing';

import { ManagerInfoService } from './manager-info.service';

describe('ManagerInfoService', () => {
  let service: ManagerInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
