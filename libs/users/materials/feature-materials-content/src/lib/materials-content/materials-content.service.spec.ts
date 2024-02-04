import { TestBed } from '@angular/core/testing';

import { MaterialsContentYoutubeService } from './materials-content-youtube.service';

describe('MaterialsContentService', () => {
  let service: MaterialsContentYoutubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialsContentYoutubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
