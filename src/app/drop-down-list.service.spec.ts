import { TestBed } from '@angular/core/testing';

import { DropDownListService } from './drop-down-list.service';

describe('DropDownListService', () => {
  let service: DropDownListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropDownListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
