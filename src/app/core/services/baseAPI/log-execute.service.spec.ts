import { TestBed } from '@angular/core/testing';

import { LogExecuteService } from './log-execute.service';

describe('LogExecuteService', () => {
  let service: LogExecuteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogExecuteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
