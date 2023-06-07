import { TestBed } from '@angular/core/testing';

import { UseRoleService } from './use-role.service';

describe('UseRoleService', () => {
  let service: UseRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
