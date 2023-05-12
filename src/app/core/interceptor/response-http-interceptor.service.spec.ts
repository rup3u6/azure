import { TestBed } from '@angular/core/testing';

import { ResponseHttpInterceptorService } from './response-http-interceptor.service';

describe('ResponseHttpInterceptorService', () => {
  let service: ResponseHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
