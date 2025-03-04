import { TestBed } from '@angular/core/testing';

import { MaterialsFacade } from './materials.facade';

describe('MaterialsFacade', () => {
  let service: MaterialsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
