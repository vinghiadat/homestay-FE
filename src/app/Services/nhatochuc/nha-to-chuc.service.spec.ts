import { TestBed } from '@angular/core/testing';

import { NhaToChucService } from './nha-to-chuc.service';

describe('NhaToChucService', () => {
  let service: NhaToChucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhaToChucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
