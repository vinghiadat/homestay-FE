import { TestBed } from '@angular/core/testing';

import { SuKienService } from './su-kien.service';

describe('SuKienService', () => {
  let service: SuKienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuKienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
