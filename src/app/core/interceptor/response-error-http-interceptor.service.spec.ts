import { TestBed } from '@angular/core/testing';

import { ResponseErrorHttpInterceptorService } from './response-error-http-interceptor.service';

describe('ResponseErrorHttpInterceptorService', () => {
  let service: ResponseErrorHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseErrorHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
