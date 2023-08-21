import { TestBed } from '@angular/core/testing';

import { ArticleReadService } from './article-read.service';

describe('ArticleReadService', () => {
  let service: ArticleReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
