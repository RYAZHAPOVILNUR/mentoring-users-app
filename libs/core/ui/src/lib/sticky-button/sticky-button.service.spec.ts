import { TestBed } from '@angular/core/testing';

import { StickyButtonService } from './sticky-button.service';

describe('StickyButtonService', () => {
  let service: StickyButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StickyButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
