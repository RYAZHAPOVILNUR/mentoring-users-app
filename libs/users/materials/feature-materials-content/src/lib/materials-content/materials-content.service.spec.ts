import { TestBed } from '@angular/core/testing';

import { MaterialsContentService } from './materials-content.service';

describe('MaterialsContentService', () => {
  let service: MaterialsContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialsContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
