import { TestBed } from '@angular/core/testing';

import { MinicoreService } from './minicore.service';

describe('MinicoreService', () => {
  let service: MinicoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinicoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
