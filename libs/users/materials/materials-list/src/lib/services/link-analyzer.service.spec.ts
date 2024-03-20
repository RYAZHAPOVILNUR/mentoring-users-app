import { TestBed } from '@angular/core/testing';

import { LinkAnalyzerService } from './link-analyzer.service';

describe('LinkAnalyzerService', () => {
  let service: LinkAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
