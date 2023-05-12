import { TestBed } from '@angular/core/testing';

import { TokenAuthHttpInterceptorService } from './token-auth-http-interceptor.service';

describe('TokenAuthHttpInterceptorService', () => {
  let service: TokenAuthHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenAuthHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
