import { TestBed } from '@angular/core/testing';

import { HoatDongService } from './hoat-dong.service';

describe('HoatDongService', () => {
  let service: HoatDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoatDongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
