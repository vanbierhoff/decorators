import { TestBed } from '@angular/core/testing';

import { DecoratorsLibService } from './decorators-lib.service';

describe('DecoratorsLibService', () => {
  let service: DecoratorsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecoratorsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
